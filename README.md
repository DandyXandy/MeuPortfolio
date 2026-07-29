# Dandy Abadie — Portfólio

Site pessoal/portfólio de Dandy Abadie Atoche. Next.js + TypeScript +
Tailwind CSS, com tradução automática em Português, Inglês e Espanhol.

---

## 1. Rodando no seu computador

```
npm install
npm run dev
```

Abra http://localhost:3000 no navegador.

---

## 2. Como adicionar um novo site na seção "Projetos"

Isso é o que você vai mexer com mais frequência. Tudo está explicado
com comentários dentro do arquivo:

**`src/data/projects.ts`**

Resumo rápido:

1. Abra `src/data/projects.ts` e copie o bloco de exemplo no final do
   array `projects`.
2. Preencha `id` (um nome único), `url` (o link do site publicado) e
   `tags` (tecnologias usadas). Use `featured: true` se quiser destacar.
3. Abra os 3 arquivos de tradução (`src/messages/pt.json`,
   `en.json`, `es.json`) e adicione, dentro de `"projects.items"`, uma
   entrada com o mesmo `id`, com `title` e `description`.
4. Salve. O card novo aparece sozinho na seção Projetos, com uma
   screenshot ao vivo do site (gerada automaticamente a partir da URL,
   não precisa printar nada na mão).

---

## 3. Textos do site (bio, skills, contato)

Todo o texto do site fica nos arquivos de tradução:

- `src/messages/pt.json`
- `src/messages/en.json`
- `src/messages/es.json`

Editando esses arquivos você muda o texto nos 3 idiomas. O número de
WhatsApp e o e-mail de contato ficam no topo dos arquivos
`src/components/Contact.tsx` e `src/components/FloatingWhatsApp.tsx`.

---

## 4. Publicando (Vercel)

Mesmo processo do IronMind:

1. Suba o código para um repositório no GitHub.
2. Entre em https://vercel.com, "Add New… > Project", escolha o
   repositório.
3. Não precisa configurar nenhuma variável de ambiente — é um site
   estático, sem banco de dados.
4. Clique em "Deploy".

---

## 5. Próximos passos possíveis

- Trocar as screenshots automáticas por imagens fixas, se algum site
  sair do ar.
- Adicionar uma seção de depoimentos/clientes.
- Conectar um domínio próprio (ex: `dandyabadie.dev`).
