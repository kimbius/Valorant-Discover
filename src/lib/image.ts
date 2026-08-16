const IMAGE_PROXY = "https://wsrv.nl/?url=";

/**
 * Proxy remote images through wsrv.nl so mixed-content and hotlink
 * issues from vlr.gg / owcdn.net don't break the UI. Local assets
 * pass through untouched.
 */
export function proxyImage(url: string | null | undefined): string {
  if (!url) return "/vlr.png";
  if (url.startsWith("/")) return url;
  return `${IMAGE_PROXY}${encodeURIComponent(url)}`;
}
