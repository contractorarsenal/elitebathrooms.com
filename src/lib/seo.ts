export const SITE_URL = "https://www.elitebathrooms.com";

export function absoluteUrl(path: string) {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
