"use client"
import Image from "next/image"


export default function CardMascot() {
  return (

  <div className={`animate-bounce absolute right-4 -bottom-[0.01px]`}>
      <div className={`card-mascot-slide`}>

        <Image
            src="/rmf.png"
            width={40}
            height={40}
            alt="Rolling mascot"
        />
      </div>

        
  </div>
  )
}
