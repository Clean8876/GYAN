import Map from '../../../assets/map.png'
import MobileMap from '../../../assets/Mmap.png'

import { useState,useEffect } from 'react'

function Worldmap() {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); 

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <img
    className="w-full max-w-[1120px] h-100px" 
    alt="World Map"
    src={isMobile ? MobileMap : Map} 
  />

  )
}

export default Worldmap