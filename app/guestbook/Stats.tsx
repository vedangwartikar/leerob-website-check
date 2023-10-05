/* eslint-disable quotes */
import { db } from 'lib/db'
import { tbs } from 'lib/schema'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const GlobeViz = dynamic(() => import('./Globe'))

export default async function StatsPage() {
  const data = await db()
    .selectDistinct({
      geo_ip_latitude: tbs.views.geo_ip_latitude,
      geo_ip_longitude: tbs.views.geo_ip_longitude,
      geo_ip_city: tbs.views.geo_ip_city,
      geo_ip_country: tbs.views.geo_ip_country,
      geo_ip_region: tbs.views.geo_ip_region,
    })
    .from(tbs.views)

  const processedData = data
    .filter((d) => d.geo_ip_latitude && d.geo_ip_longitude)
    .map((d) => ({
      ...d,
      lat: parseFloat(d.geo_ip_latitude || ''),
      lng: parseFloat(d.geo_ip_longitude || ''),
      size: 2,
      color: 'green',
    }))

  return (
    <>
      <Suspense fallback={<div className=" text-neutral-400 dark:text-neutral-600">Loading...</div>}>
        <div className="-mt-4 text-neutral-500 dark:text-neutral-400 text-center ">
          Here&apos;s a fancy 3D map of all my stalkers (I mean visitors) in real time!
        </div>

        <div className="text-sm text-center text-neutral-400 dark:text-neutral-600 mb-2">
          This is 100% anonymous. I swear!
        </div>
        <GlobeViz data={processedData} />
      </Suspense>
    </>
  )
}
