import { createClient } from '@supabase/supabase-js';

// Cliente Supabase com a service role key — só pode ser usado no
// servidor (rotas de API), nunca importado em um componente 'use client'.
// A service role key ignora RLS, por isso NUNCA deve ser exposta ao
// navegador (não usa o prefixo NEXT_PUBLIC_).
export function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error('Supabase não configurado: defina SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no .env');
  }

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false },
  });
}
