import { NextResponse } from 'next/server';
import { renderToBuffer } from '@react-pdf/renderer';
import { continueProjectSchema } from '@/lib/continue-project/schema';
import { buildContinueProjectBriefData } from '@/lib/continue-project/buildBriefData';
import { getSupabaseAdmin } from '@/lib/supabase-admin';
import ProjectBriefDocument from '@/lib/pdf/ProjectBriefDocument';
import { sendNotificationEmail, sendConfirmationEmail } from '@/lib/email/resend';
import { isRateLimited, getClientIp } from '@/lib/rate-limit';

export async function POST(request: Request) {
  if (isRateLimited(`continue-project:${getClientIp(request)}`)) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  }

  const json = await request.json().catch(() => null);
  const parsed = continueProjectSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid_payload' }, { status: 400 });
  }

  const data = parsed.data;

  if (data.website) {
    return NextResponse.json({ success: true });
  }

  let briefingId: string | null = null;

  try {
    const supabase = getSupabaseAdmin();
    const { data: row, error } = await supabase
      .from('project_briefings')
      .insert({
        contact_name: data.contactName,
        company_name: data.companyName || null,
        contact_whatsapp: data.contactWhatsapp,
        contact_email: data.contactEmail,
        instagram: data.instagram || null,
        current_site: data.currentSite || null,
        business_segment: data.businessSegment,
        business_description: data.businessDescription || null,
        project_type: data.projectType,
        product_count: data.productCount || null,
        features: data.features,
        payment_gateway: data.paymentGateway || null,
        reference_site: data.referenceSite || null,
        desired_style: data.desiredStyle || null,
        visual_references: data.visualReferences || null,
        timeline: data.timeline,
        budget: data.budget,
        locale: data.locale,
      })
      .select('id')
      .single();

    if (error || !row) throw error ?? new Error('insert_failed');
    briefingId = row.id as string;
  } catch (err) {
    // Banco fora do ar ou mal configurado: não descarta o briefing. Segue pro
    // PDF + e-mail de notificação, que também carregam tudo.
    console.error('[continue-project] Falha ao salvar no Supabase:', err);
  }

  let notified = false;
  try {
    const briefData = await buildContinueProjectBriefData(data);
    const pdfBuffer = await renderToBuffer(ProjectBriefDocument({ data: briefData }));

    if (briefingId) {
      try {
        const supabase = getSupabaseAdmin();
        const path = `${briefingId}.pdf`;
        await supabase.storage.from('project-briefs').upload(path, pdfBuffer, {
          contentType: 'application/pdf',
          upsert: true,
        });

        const { data: signed } = await supabase.storage
          .from('project-briefs')
          .createSignedUrl(path, 60 * 60 * 24 * 60);

        if (signed?.signedUrl) {
          await supabase
            .from('project_briefings')
            .update({ pdf_url: signed.signedUrl })
            .eq('id', briefingId);
        }
      } catch (err) {
        console.error('[continue-project] Falha ao salvar PDF no Storage:', err);
      }
    }

    notified = await sendNotificationEmail(briefData, pdfBuffer, { dbSaved: briefingId !== null })
      .then(() => true)
      .catch((err) => {
        console.error('[continue-project] Falha ao enviar e-mail de notificação:', err);
        return false;
      });

    await sendConfirmationEmail({
      clientEmail: data.contactEmail,
      clientName: data.contactName,
      locale: data.locale,
    }).catch((err) => console.error('[continue-project] Falha ao enviar e-mail de confirmação:', err));
  } catch (err) {
    console.error('[continue-project] Falha ao gerar PDF/e-mails:', err);
  }

  // Só é "perdido" se NEM o banco NEM o e-mail pro dono funcionaram.
  if (!briefingId && !notified) {
    return NextResponse.json({ error: 'database_error' }, { status: 500 });
  }

  return NextResponse.json({ success: true, id: briefingId });
}
