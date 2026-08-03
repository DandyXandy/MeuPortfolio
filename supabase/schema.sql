-- Rode esse script uma vez no seu projeto Supabase:
-- Dashboard do projeto -> SQL Editor -> New query -> cole tudo -> Run.

create table if not exists project_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  project_type text not null,
  info jsonb not null default '{}',
  design_styles text[] not null default '{}',
  design_reference text,
  features text[] not null default '{}',
  timeline text not null,
  budget text not null,
  contact_name text not null,
  contact_company text,
  contact_email text not null,
  contact_whatsapp text,
  preferred_contact text not null,
  locale text not null default 'pt',
  pdf_url text
);

-- Row Level Security ligado, sem policies públicas: só a
-- "service role key" (usada pela rota da API, nunca pelo navegador)
-- consegue ler ou escrever nessa tabela.
alter table project_requests enable row level security;

-- Depois de rodar esse script, crie o bucket de armazenamento:
-- Dashboard -> Storage -> Create a new bucket -> nome: project-briefs
-- -> deixe como "Private" (não marque "Public bucket").
