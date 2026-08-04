import { Resend } from 'resend';
import type { BriefData } from '../pdf/ProjectBriefDocument';
import { notificationEmailHtml, confirmationEmailHtml } from './templates';

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error('RESEND_API_KEY não configurada no .env');
  return new Resend(apiKey);
}

export async function sendNotificationEmail(data: BriefData, pdfBuffer: Buffer) {
  const resend = getResend();
  const from = process.env.RESEND_FROM_EMAIL ?? 'Portfólio <onboarding@resend.dev>';
  const to = process.env.NOTIFICATION_EMAIL;
  if (!to) throw new Error('NOTIFICATION_EMAIL não configurado no .env');

  const { error } = await resend.emails.send({
    from,
    to,
    subject: `Novo projeto: ${data.clientName} — ${data.projectTypeTitle}`,
    html: notificationEmailHtml(data),
    attachments: [
      {
        filename: 'briefing-projeto.pdf',
        content: pdfBuffer,
      },
    ],
  });

  if (error) throw new Error(`Resend (notificação): ${error.message}`);
}

export async function sendConfirmationEmail(params: {
  clientEmail: string;
  clientName: string;
  locale: 'pt' | 'en' | 'es';
}) {
  const resend = getResend();
  const from = process.env.RESEND_FROM_EMAIL ?? 'Dandy Abadie <onboarding@resend.dev>';
  const { subject, html } = confirmationEmailHtml(params);

  const { error } = await resend.emails.send({
    from,
    to: params.clientEmail,
    subject,
    html,
  });

  if (error) throw new Error(`Resend (confirmação): ${error.message}`);
}
