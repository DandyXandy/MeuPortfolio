// =====================================================================
// LISTA DE PROJETOS DO PORTFÓLIO
// =====================================================================
// Cada item aqui vira automaticamente um card na seção "Projetos" do
// site. A screenshot do card é gerada ao vivo a partir da própria URL
// (não precisa print nem upload de imagem).
//
// ┌───────────────────────────────────────────────────────────────┐
// │  COMO ADICIONAR OUTRO SITE (leia com calma antes de mexer)     │
// └───────────────────────────────────────────────────────────────┘
//
// PASSO 1 — copie o bloco de exemplo lá embaixo (no final do array
//           `projects`) e cole antes do `];` de fechamento.
//
// PASSO 2 — troque os valores:
//   id       -> um identificador único, sem espaço e sem acento
//               (ex: "meu-novo-site")
//   url      -> o link do site já publicado (com https://)
//   tags     -> lista de tecnologias usadas, aparecem como badges
//   year     -> ano em que foi construído (aparece no card)
//   featured -> true faz o projeto entrar na seção "Featured" (com
//               case study próprio) em vez da grade "Outros projetos".
//               Só marque true se também criar o case study
//               correspondente em src/data/case-studies/.
//   caseStudy -> slug da página de case study (só projetos featured),
//               tem que bater com o arquivo em src/data/case-studies/
//   github   -> link do repositório, só preencha se o repo for público
//               de verdade — se for privado (projeto de cliente) ou você
//               preferir não mostrar o código, deixe undefined (o botão
//               "Ver código" simplesmente não aparece, sem link quebrado)
//
// PASSO 3 — abra os 3 arquivos de tradução:
//   src/messages/pt.json
//   src/messages/en.json
//   src/messages/es.json
//   e dentro de "projects.items" adicione uma entrada com o MESMO id,
//   assim (exemplo em pt.json):
//
//   "meu-novo-site": {
//     "title": "Nome do site",
//     "description": "Uma frase curta contando o que o site faz."
//   }
//
// PASSO 4 — salve tudo. O novo card aparece sozinho na seção Projetos,
//           na mesma ordem em que está neste array.
//
// Pronto, não precisa mexer em mais nenhum outro arquivo. =)
// =====================================================================

export type Project = {
  id: string;
  url: string;
  tags: string[];
  year: number;
  featured?: boolean;
  caseStudy?: string;
  github?: string;
};

export const projects: Project[] = [
  {
    id: 'ironmind',
    url: 'https://ironmind-ivory.vercel.app/',
    tags: ['Next.js', 'Prisma', 'PostgreSQL', 'NextAuth'],
    year: 2026,
    featured: true,
    caseStudy: 'ironmind',
    github: 'https://github.com/DandyXandy/IRONMIND',
  },
  {
    id: 'cafe-productions',
    url: 'https://cafe-frontend-five-rust.vercel.app/',
    // Stack real confirmado por Dandy (coincide con su CV): React en el
    // frontend, Java Spring Boot en el backend — no Next.js/Framer Motion
    // como decían las tags viejas, eso era un dato incorrecto.
    tags: ['React', 'Java', 'Spring Boot'],
    year: 2025,
    featured: true,
    caseStudy: 'cafe-productions',
    // Sin campo github a propósito: el repo es privado (proyecto hecho
    // para una empresa/cliente) — Dandy confirmó que se muestra solo
    // el link al sitio en vivo, sin botón de código.
  },
  {
    id: 'dandy-portfolio',
    url: 'https://portfoliodandy.com/',
    tags: ['Next.js 16', 'React 19', 'TypeScript', 'Supabase'],
    year: 2026,
    featured: true,
    caseStudy: 'dandy-portfolio',
    // Sin campo github a propósito: Dandy prefirió no exponer el código
    // del propio portfolio, aunque el repo (MeuPortfolio) exista.
  },
  {
    id: 'brutal-labs',
    url: 'https://brutal-labs.vercel.app/',
    tags: ['Next.js', 'Tailwind', 'E-commerce'],
    year: 2026,
    github: 'https://github.com/DandyXandy/brutalLabs',
  },
  {
    id: 'aurum-residences',
    url: 'https://aurum-residences-liart.vercel.app/pt',
    tags: ['Next.js', 'Framer Motion', 'next-intl'],
    year: 2026,
    github: 'https://github.com/DandyXandy/aurum-residences',
  },
  {
    id: 'meridian-capital',
    url: 'https://meridian-capital-eta.vercel.app/pt',
    tags: ['Next.js', 'Framer Motion', 'next-intl'],
    year: 2026,
    github: 'https://github.com/DandyXandy/meridian-capital',
  },
  {
    id: 'apex-mastermind',
    url: 'https://apex-mastermin.vercel.app/',
    tags: ['Next.js', 'Landing Page', 'AOS'],
    year: 2026,
    github: 'https://github.com/DandyXandy/Apex-Mastermin',
  },
  {
    id: 'raiz-blog',
    url: 'https://blog-beta-seven-71.vercel.app/pt',
    tags: ['Next.js', 'Blog', 'next-intl'],
    year: 2026,
    github: 'https://github.com/DandyXandy/blog',
  },
  {
    id: 'ag-store',
    url: 'https://agstoreofc.vercel.app/',
    tags: ['React', 'Vite', 'E-commerce'],
    year: 2026,
    github: 'https://github.com/DandyXandy/A-G-Store',
  },
  {
    id: 'sidma',
    url: 'https://sidma-monitoramento.vercel.app/',
    tags: ['Node.js', 'Express', 'PostgreSQL'],
    year: 2026,
    github: 'https://github.com/DandyXandy/sidma-monitoramento',
  },
  {
    id: 'gym-forja',
    url: 'https://gymforja.vercel.app/',
    tags: ['Node.js', 'Express', 'E-commerce'],
    year: 2026,
    github: 'https://github.com/DandyXandy/exemplo-pagina-para-academia',
  },
  {
    id: 'raiz-latina',
    url: 'https://paginaraizlatina.vercel.app/',
    tags: ['Node.js', 'Express', 'PostgreSQL'],
    year: 2026,
    github: 'https://github.com/DandyXandy/Site-Ra-z-Latina',
  },
  {
    id: 'loja-modelo',
    url: 'https://ejemplo-tienda-ecommerce.vercel.app/',
    tags: ['Node.js', 'Express', 'PostgreSQL'],
    year: 2026,
    github: 'https://github.com/DandyXandy/ejemplo-tienda-ecommerce',
  },

  // --- exemplo (apague o comentário e preencha para usar) ---------
  // { id: 'meu-novo-site', url: 'https://meu-novo-site.vercel.app/', tags: ['Next.js'], year: 2026, featured: false },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);
