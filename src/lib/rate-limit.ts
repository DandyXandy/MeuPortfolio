// Rate limiting simple, en memoria, para las dos rutas públicas de
// captación de leads (/api/request-project, /api/continue-project).
//
// Por qué en memoria y no Supabase/Redis: agregar una tabla nueva
// hubiera significado tocar el schema de Supabase (explícitamente
// fuera de alcance en esta fase), y sumar Redis/Vercel KV es
// infraestructura nueva que no se justifica para el volumen de tráfico
// real de un portfolio personal — se documenta como mejora futura, no
// se implementa ahora.
//
// Limitación real y honesta: en Vercel (serverless) este Map vive
// mientras la instancia de la función siga "caliente". Contra el caso
// que de verdad nos importa acá — alguien reenviando el mismo
// formulario en bucle en una sesión corta — esto funciona bien, porque
// ese tráfico sostenido tiende a caer en la misma instancia tibia. No
// es una defensa perfecta contra un atacante que fuerce muchos cold
// starts distintos a propósito; para eso hace falta un store
// compartido entre instancias.

const WINDOW_MS = 10 * 60 * 1000; // 10 minutos
const MAX_REQUESTS = 3; // por IP, por ruta, por ventana

const hits = new Map<string, number[]>();

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const timestamps = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);

  if (timestamps.length >= MAX_REQUESTS) {
    hits.set(key, timestamps);
    return true;
  }

  timestamps.push(now);
  hits.set(key, timestamps);

  // Limpieza oportunista para que el Map no crezca sin límite si pasan
  // muchas IPs distintas — no es un cron, solo evita un memory leak lento.
  if (hits.size > 5000) {
    for (const [k, arr] of hits) {
      if (arr.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
    }
  }

  return false;
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0]!.trim();
  return request.headers.get('x-real-ip') ?? 'unknown';
}
