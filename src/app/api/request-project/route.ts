import { NextResponse } from 'next/server';
import { renderToBuffer } from '@react-pdf/renderer';
import { requestProjectSchema } from '@/lib/request-project/schema';
import { buildBriefData } from '@/lib/request-project/buildBriefData';
import { getSupabaseAdmin } from '@/lib/supabase-admin';
import ProjectBriefDocument from '@/lib/pdf/ProjectBriefDocument';
import { sendNotificationEmail, sendConfirmationEmail } from '@/lib/email/resend';
import { isRateLimited, getClientIp } from '@/lib/rate-limit';

export async function POST(request: Request) {
  if (isRateLimited(`request-project:${getClientIp(request)}`)) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  }

  const json = await request.json().catch(() => null);
  const parsed = requestProjectSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid_payload' }, { status: 400 });
  }

  const data = parsed.data;

  // Campo-armadilha: se um bot preencheu, respondemos "sucesso" sem
  // gravar nada nem gastar cota de e-mail.
  if (data.website) {
    return NextResponse.json({ success: true });
  }

  let requestId: string | null = null;

  try {
    const supabase = getSupabaseAdmin();
    const { data: row, error } = await supabase
      .from('project_requests')
      .insert({
        project_type: data.projectType,
        info: data.info,
        design_styles: data.designStyles,
        design_reference: data.designReference || null,
        features: data.features,
        timeline: data.timeline,
        budget: data.budget,
        contact_name: data.contactName,
        contact_company: data.contactCompany || null,
        contact_email: data.contactEmail,
        contact_whatsapp: data.contactWhatsapp || null,
        preferred_contact: data.preferredContact,
        locale: data.locale,
      })
      .select('id')
      .single();

    if (error || !row) throw error ?? new Error('insert_failed');
    requestId = row.id as string;
  } catch (err) {
    // Banco fora do ar ou mal configurado: não descarta o pedido. Segue pro
    // PDF + e-mail de notificação, que também carregam o briefing completo.
    console.error('[request-project] Falha ao salvar no Supabase:', err);
  }

  // PDF e e-mails são "best effort": se falharem, logamos e seguimos.
  let notified = false;
  try {
    const briefData = await buildBriefData(data);
    const pdfBuffer = await renderToBuffer(ProjectBriefDocument({ data: briefData }));

    if (requestId) {
      try {
        const supabase = getSupabaseAdmin();
        const path = `${requestId}.pdf`;
        await supabase.storage.from('project-briefs').upload(path, pdfBuffer, {
          contentType: 'application/pdf',
          upsert: true,
        });

        const { data: signed } = await supabase.storage
          .from('project-briefs')
          .createSignedUrl(path, 60 * 60 * 24 * 60);

        if (signed?.signedUrl) {
          await supabase
            .from('project_requests')
            .update({ pdf_url: signed.signedUrl })
            .eq('id', requestId);
        }
      } catch (err) {
        console.error('[request-project] Falha ao salvar PDF no Storage:', err);
      }
    }

    notified = await sendNotificationEmail(briefData, pdfBuffer, { dbSaved: requestId !== null })
      .then(() => true)
      .catch((err) => {
        console.error('[request-project] Falha ao enviar e-mail de notificação:', err);
        return false;
      });

    await sendConfirmationEmail({
      clientEmail: data.contactEmail,
      clientName: data.contactName,
      locale: data.locale,
    }).catch((err) => console.error('[request-project] Falha ao enviar e-mail de confirmação:', err));
  } catch (err) {
    console.error('[request-project] Falha ao gerar PDF/e-mails:', err);
  }

  // O pedido só é dado como perdido se NEM o banco NEM o e-mail pro dono
  // funcionaram — aí sim o visitante precisa saber (e cai no WhatsApp).
  if (!requestId && !notified) {
    return NextResponse.json({ error: 'database_error' }, { status: 500 });
  }

  return NextResponse.json({ success: true, id: requestId });
}
