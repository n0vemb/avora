const STRAPI_API_URL = process.env.STRAPI_API_URL || 'http://localhost:1337'
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || ''

const TIMEOUT = 5000

interface StrapiClientOptions {
  headers?: Record<string, string>
  cache?: RequestCache
  next?: NextFetchRequestConfig
}

export async function strapiFetch<T>(
  endpoint: string,
  options: StrapiClientOptions = {}
): Promise<T> {
  const url = `${STRAPI_API_URL}/api${endpoint}`

  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  if (STRAPI_API_TOKEN) {
    defaultHeaders['Authorization'] = `Bearer ${STRAPI_API_TOKEN}`
  }

  const headers = { ...defaultHeaders, ...options.headers }

  try {
    const abortController = new AbortController()
    const timeoutId = setTimeout(() => abortController.abort(), TIMEOUT)

    const response = await fetch(url, {
      method: 'GET',
      headers,
      cache: options.cache || 'no-cache',
      next: options.next,
      signal: abortController.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      console.warn(`Strapi API error: ${response.status} ${response.statusText}`)
      return { data: [] } as unknown as T
    }

    return response.json() as T
  } catch (error) {
    console.warn(`Strapi API request failed: ${error instanceof Error ? error.message : String(error)}`)
    return { data: [] } as unknown as T
  }
}

export function buildStrapiUrl(
  endpoint: string,
  params?: Record<string, string | number | boolean>
): string {
  const url = new URL(endpoint, STRAPI_API_URL)

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value))
    })
  }

  return url.pathname + url.search
}

export const strapiClient = {
  get: strapiFetch,
  buildUrl: buildStrapiUrl,
}