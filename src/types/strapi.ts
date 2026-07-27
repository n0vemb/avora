export interface StrapiMeta {
  pagination?: {
    page: number
    pageSize: number
    pageCount: number
    total: number
  }
}

export interface StrapiImage {
  id: number
  attributes: {
    url: string
    alternativeText?: string
    width: number
    height: number
    formats?: {
      thumbnail?: { url: string; width: number; height: number }
      small?: { url: string; width: number; height: number }
      medium?: { url: string; width: number; height: number }
      large?: { url: string; width: number; height: number }
    }
  }
}

export interface StrapiSingleResponse<T> {
  data: {
    id: number
    attributes: T
  }
}

export interface StrapiCollectionResponse<T> {
  data: {
    id: number
    attributes: T
  }[]
  meta: StrapiMeta
}

export type StrapiResponse<T> = StrapiSingleResponse<T> | StrapiCollectionResponse<T>