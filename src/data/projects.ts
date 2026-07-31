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
//   featured -> true deixa o card com borda brilhante e destaque
//               (use só para 1 projeto especial por vez)
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
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: 'ironmind',
    url: 'https://ironmind-ivory.vercel.app/',
    tags: ['Next.js', 'Prisma', 'PostgreSQL', 'NextAuth'],
  },
  {
    id: 'brutal-labs',
    url: 'https://brutal-labs.vercel.app/pt',
    tags: ['Next.js', 'Tailwind', 'E-commerce'],
  },
  {
    id: 'aurum-residences',
    url: 'https://aurum-residences-liart.vercel.app/pt',
    tags: ['Next.js', 'Framer Motion', 'next-intl'],
  },
  {
    id: 'meridian-capital',
    url: 'https://meridian-capital-eta.vercel.app/pt',
    tags: ['Next.js', 'Framer Motion', 'next-intl'],
  },
  {
    id: 'apex-mastermind',
    url: 'https://apex-mastermin.vercel.app/',
    tags: ['Next.js', 'Landing Page', 'AOS'],
  },
  {
    id: 'raiz-blog',
    url: 'https://blog-beta-seven-71.vercel.app/pt',
    tags: ['Next.js', 'Blog', 'next-intl'],
  },
  {
    id: 'cafe-productions',
    url: 'https://cafe-frontend-five-rust.vercel.app/',
    tags: ['Next.js', 'Framer Motion', 'Community'],
    featured: true,
  },
  {
    id: 'ag-store',
    url: 'https://agstoreofc.vercel.app/',
    tags: ['React', 'Vite', 'E-commerce'],
  },
  {
    id: 'sidma',
    url: 'https://sidma-monitoramento.vercel.app/',
    tags: ['Node.js', 'Express', 'PostgreSQL'],
  },
  {
    id: 'Gym',
    url: 'https://gymforja.vercel.app/',
    tags: ['Node.js', 'Express', 'E-commerceL'],
  },
  {
    id: 'Restaurantes',
    url: 'https://paginaraizlatina.vercel.app/',
    tags: ['Node.js', 'Express', 'PostgreSQL'],
  },
  {
    id: 'Exemplo Ecommerce',
    url: 'https://ejemplo-tienda-ecommerce.vercel.app/',
    tags: ['Node.js', 'Express', 'PostgreSQL'],
  },
  {
    id: 'Blog',
    url: 'https://blog-beta-seven-71.vercel.app/pt',
    tags: ['Node.js', 'Express', 'PostgreSQL'],
  },

  // --- exemplo (apague o comentário e preencha para usar) ---------
  // { id: 'meu-novo-site', url: 'https://meu-novo-site.vercel.app/', tags: ['Next.js'], featured: false },
];
