const STRAPI_API_URL = process.env.STRAPI_API_URL || 'http://localhost:1337'
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || ''

const TIMEOUT = 10000
const MAX_RETRIES = 3

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

  let retryCount = 0
  let lastError: Error | null = null

  while (retryCount < MAX_RETRIES) {
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
        const errorText = await response.text()
        throw new Error(`Strapi API error: ${response.status} ${response.statusText} - ${errorText}`)
      }

      return response.json() as T
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error))
      retryCount++

      if (retryCount < MAX_RETRIES) {
        await new Promise((resolve) => setTimeout(resolve, 1000 * Math.pow(2, retryCount)))
      }
    }
  }

  throw lastError || new Error('Strapi API request failed after retries')
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