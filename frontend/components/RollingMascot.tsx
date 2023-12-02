"use client"
import Image from "next/image"
import { useState } from "react"


export default function RollingMascot() {
    const [hovered, setHovered] = useState(false)
    const rollingOut = () => {
        setHovered(true)
    }
  return (

  <div className={`${hovered ? "mascot-slide" : null} hidden lg:block absolute 
  left-36 -bottom-1`}>
      <div className={`${hovered ? "mascot-spin" : null}`}>

        <Image
            onMouseOver={() => rollingOut()} 
            src="/rmf_swirl.png"
            width={40}
            height={40}
            alt="Rolling mascot"
        />
      </div>

        
  </div>
  )
}
