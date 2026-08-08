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
-- (o mesmo bucket serve pros PDFs de project_requests e project_briefings)

-- Tabela da seção "Continuar Projeto" (leads que já conversaram pelo
-- WhatsApp/Instagram) — separada de project_requests porque as
-- perguntas são diferentes.
create table if not exists project_briefings (
  id uuid primary key default gen_random_uuid(),
  -- token público pra uma futura página individual tipo /projeto/[token]
  -- (não usado ainda, só deixando a arquitetura pronta pra isso).
  token uuid not null default gen_random_uuid() unique,
  created_at timestamptz not null default now(),
  contact_name text not null,
  company_name text,
  contact_whatsapp text not null,
  contact_email text not null,
  instagram text,
  current_site text,
  business_segment text not null,
  business_description text,
  project_type text not null,
  product_count text,
  features text[] not null default '{}',
  payment_gateway text,
  reference_site text,
  desired_style text,
  visual_references text,
  timeline text not null,
  budget text not null,
  locale text not null default 'pt',
  pdf_url text
);

alter table project_briefings enable row level security;
