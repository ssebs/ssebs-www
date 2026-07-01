export function intro(body: string): string {
  const marker = '<!--more-->';
  const idx = body.indexOf(marker);
  return (idx === -1 ? body : body.slice(0, idx)).trim();
}
