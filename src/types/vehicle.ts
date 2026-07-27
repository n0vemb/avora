import { MediaData } from './common'

export interface Vehicle {
  id: number
  brand: string
  model: string
  generation?: string
  yearFrom: number
  yearTo?: number
  pcd?: string
  centerBore?: string
  images?: MediaData[]
}

export interface StrapiVehicleAttributes {
  brand: string
  model: string
  generation?: string
  yearFrom: number
  yearTo?: number
  pcd?: string
  centerBore?: string
  images?: { data: StrapiImage[] }
}

import type { StrapiImage } from './strapi'