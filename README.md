# Dandy Abadie — Portfólio

Site pessoal/portfólio de Dandy Abadie Atoche. Next.js + TypeScript +
Tailwind CSS, com tradução automática em Português, Inglês e Espanhol.


## Configurando a seção "Solicitar Projeto"

Essa seção salva os pedidos de projeto no Supabase e manda e-mail pra
você e pro cliente automaticamente. Sem isso configurado, o formulário
aparece normal mas o envio final vai dar erro.

### 1. Crie o banco de dados (Supabase, grátis)

1. Crie uma conta em https://supabase.com e um novo projeto.
2. No projeto, vá em **SQL Editor** e rode o conteúdo do arquivo
   [`supabase/schema.sql`](supabase/schema.sql) (cria a tabela
   `project_requests`).
3. Vá em **Storage** e crie um bucket chamado `project-briefs`,
   deixando como **privado** (não marcar "Public bucket").
4. Vá em **Settings → API** e copie a **Project URL** e a
   **service_role key** (não é a "anon key" — tem que ser a service
   role, que fica escondida atrás de um "Reveal").

### 2. Crie a conta de e-mail (Resend, grátis)

1. Crie uma conta em https://resend.com.
2. Em **API Keys**, crie uma chave nova.
3. Enquanto você não conectar um domínio próprio no Resend, os e-mails
   só podem ser enviados usando o remetente de teste
   `onboarding@resend.dev` — funciona normal, só aparece esse endereço
   como remetente.

### 3. Preencha o `.env`

Copie `.env.example` para `.env` e cole os valores que você pegou:

```
SUPABASE_URL="..."
SUPABASE_SERVICE_ROLE_KEY="..."
RESEND_API_KEY="..."
RESEND_FROM_EMAIL="Dandy Abadie <onboarding@resend.dev>"
NOTIFICATION_EMAIL="dandyabadie12@gmail.com"
```

Na Vercel, adicione essas mesmas variáveis em **Settings →
Environment Variables** do projeto.

### 4. Testando

Rode `npm run dev`, abra `/solicitar-projeto`, preencha o formulário
até o fim e confira: uma linha nova na tabela `project_requests` do
Supabase, um e-mail em `NOTIFICATION_EMAIL` com o PDF anexado, e um
e-mail de confirmação no e-mail que você usou no teste.

---

## 5. Próximos passos possíveis

- Trocar as screenshots automáticas por imagens fixas, se algum site
  sair do ar.
- Adicionar uma seção de depoimentos/clientes.
- Conectar um domínio próprio (ex: `dandyabadie.dev`).
