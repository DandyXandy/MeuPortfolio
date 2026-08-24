// Fuente única de verdad de identidad/contacto de Dandy. Todo componente
// que necesite email, WhatsApp, redes o datos académicos debe importar
// de aquí — no volver a hardcodear estos valores en componentes.

export const profile = {
  fullName: 'Dandy Alexandre Abadie Atoche',
  professionalName: 'Dandy Abadie',
  location: 'Piura, Perú',

  email: 'dandyalexandre7@gmail.com',
  whatsappNumber: '51913056331',
  whatsappDisplay: '+51 913 056 331',

  linkedinUrl: 'https://www.linkedin.com/in/dandy-abadie-atoche-32b119336/',
  linkedinHandle: 'dandy-abadie-atoche',
  githubUrl: 'https://github.com/DandyXandy',
  githubHandle: 'DandyXandy',

  university: 'Universidad Tecnológica del Perú (UTP)',
  degree: 'Ingeniería de Sistemas',
  cycleLabel: '7.º ciclo',
  studyingSince: 2023,

  languages: [
    { code: 'es', level: 'native' },
    { code: 'pt', level: 'native' },
    { code: 'en', level: 'basic' },
  ] as const,

  cvUrl: '/cv/dandy-abadie-cv.pdf',
} as const;

export function whatsappLink(message: string) {
  return `https://wa.me/${profile.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function mailtoLink() {
  return `mailto:${profile.email}`;
}
