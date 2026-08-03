import type { BriefData } from '../pdf/ProjectBriefDocument';

// E-mails simples em HTML puro (sem dependência extra de react-email).
// A notificação para o Dandy é sempre em português; a confirmação para
// o cliente segue o idioma que ele usou no site.

export function notificationEmailHtml(data: BriefData) {
  const sections = data.sections
    .map(
      (section) => `
      <h3 style="color:#8B5CF6;font-size:13px;text-transform:uppercase;letter-spacing:1px;margin:20px 0 8px;">${section.title}</h3>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        ${section.rows
          .map(
            (row) => `
          <tr>
            <td style="padding:4px 0;color:#666;width:180px;vertical-align:top;">${row.label}</td>
            <td style="padding:4px 0;font-weight:600;color:#111;">${row.value}</td>
          </tr>`
          )
          .join('')}
      </table>`
    )
    .join('');

  return `
    <div style="font-family:Helvetica,Arial,sans-serif;max-width:600px;margin:0 auto;">
      <div style="border-bottom:3px solid #8B5CF6;padding-bottom:16px;margin-bottom:16px;">
        <p style="color:#8B5CF6;font-weight:700;font-size:13px;margin:0 0 4px;">NOVA SOLICITAÇÃO DE PROJETO</p>
        <h1 style="font-size:22px;margin:0;">${data.clientName} — ${data.projectTypeTitle}</h1>
        <p style="color:#999;font-size:12px;margin:4px 0 0;">${data.submittedAt}</p>
      </div>
      ${sections}
      <p style="margin-top:24px;font-size:12px;color:#999;">O briefing completo em PDF está anexado a este e-mail.</p>
    </div>
  `;
}

export function confirmationEmailHtml(params: {
  clientName: string;
  locale: 'pt' | 'en' | 'es';
}) {
  const copy = {
    pt: {
      subject: 'Recebi sua solicitação!',
      greeting: `Olá, ${params.clientName}!`,
      body: 'Recebi todas as informações do seu projeto e já estou analisando com carinho. Em breve entro em contato pelo canal que você escolheu.',
      signoff: 'Até já,<br/>Dandy Abadie',
    },
    en: {
      subject: "I've received your request!",
      greeting: `Hi ${params.clientName}!`,
      body: "I've received all the information about your project and I'm already looking into it. I'll reach out soon through the channel you chose.",
      signoff: 'Talk soon,<br/>Dandy Abadie',
    },
    es: {
      subject: '¡Recibí tu solicitud!',
      greeting: `¡Hola, ${params.clientName}!`,
      body: 'Recibí toda la información de tu proyecto y ya la estoy revisando con atención. Pronto me pondré en contacto por el canal que elegiste.',
      signoff: 'Nos hablamos pronto,<br/>Dandy Abadie',
    },
  }[params.locale];

  return {
    subject: copy.subject,
    html: `
      <div style="font-family:Helvetica,Arial,sans-serif;max-width:480px;margin:0 auto;">
        <h1 style="font-size:20px;">${copy.greeting}</h1>
        <p style="font-size:14px;line-height:1.6;color:#333;">${copy.body}</p>
        <p style="font-size:14px;color:#333;margin-top:24px;">${copy.signoff}</p>
      </div>
    `,
  };
}
