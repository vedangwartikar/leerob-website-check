'use server'

import { getLogger } from './logger'

export interface IPResponse {
  ip: string
  network: string
  version: string
  city: string
  region: string
  region_code: string
  country: string
  country_name: string
  country_code: string
  country_code_iso3: string
  country_capital: string
  country_tld: string
  continent_code: string
  in_eu: boolean
  postal: string
  latitude: number
  longitude: number
  timezone: string
  utc_offset: string
  country_calling_code: string
  currency: string
  currency_name: string
  languages: string
  country_area: number
  country_population: number
  asn: string
  org: string
}

export async function getGeoIp(flyIp: null | string, logger: ReturnType<typeof getLogger>) {
  if (!flyIp && process.env.NODE_ENV === 'development') {
    flyIp = '2600:1700:3b8a:a010:f812:c756:5c25:c756'
  }
  if (!flyIp) return null
  try {
    const response = await ((
      await fetch(`https://ipapi.co/${flyIp}/json/`, {
        next: {
          revalidate: 30 * 24 * 60 * 60,
        },
      })
    ).json() as Promise<IPResponse>)
    return {
      geo_ip_country: response?.country || null,
      geo_ip_region: response?.region || null,
      geo_ip_city: response?.city || null,
      geo_ip_latitude: response?.latitude.toString() || null,
      geo_ip_longitude: response?.longitude.toString() || null,
    }
  } catch (e) {
    logger.error('failed to ip', e)
    return null
  }
}
