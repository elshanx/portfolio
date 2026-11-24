export function siteUrl(env: Record<string, string | undefined>): string {
  const host = env.VERCEL_PROJECT_PRODUCTION_URL
  return host ? `https://${host}` : 'http://localhost:3000'
}
