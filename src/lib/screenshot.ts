// Gera a URL de uma screenshot ao vivo do site usando o serviço
// Microlink (gratuito, sem chave de API). Assim cada card de projeto
// mostra sempre a versão mais recente do site, sem precisar tirar
// print manualmente toda vez que algo mudar.
export function getScreenshotUrl(targetUrl: string) {
  const params = new URLSearchParams({
    url: targetUrl,
    screenshot: 'true',
    meta: 'false',
    embed: 'screenshot.url',
    'viewport.width': '1280',
    'viewport.height': '800',
  });

  return `https://api.microlink.io/?${params.toString()}`;
}
