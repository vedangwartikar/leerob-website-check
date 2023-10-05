'use client'
import { PopIn } from 'app/components/Animations'
import Globe from 'react-globe.gl'
const GlobeViz = ({ data }: { data: any }) => {
  const dynamicWidth = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth > 1000) {
        return 700
      }
      if (window.innerWidth > 800) {
        return 500
      }
      return 350
    }
  }

  const dynamicHeight = () => {
    if (typeof window !== 'undefined') {
      if (window.innerHeight > 1000) {
        return 800
      }
      if (window.innerHeight > 800) {
        return 700
      }
      return 600
    }
  }
  return (
    <PopIn>
      <Globe
        width={dynamicWidth()}
        height={dynamicHeight()}
        pointsData={data}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        labelsData={data}
        labelText={(d: any) => d.geo_ip_city}
        labelSize={0.5}
      />
    </PopIn>
  )
}

export default GlobeViz
