"use client"
import { useState } from "react"

interface ButtonProps {
    PrimaryColor: string,
    SecondaryColor: string,
    ToggleCard: (i: number) => void
    i: number
}
export default function ProjectButton({PrimaryColor, SecondaryColor, ToggleCard, i}: ButtonProps){

    const [pressed, setPressed] = useState(false)

    return (
         <div onClick={() => (ToggleCard(i), setPressed(true))} 
              onTouchStart={()=> (ToggleCard(i), setPressed(true))}
              onMouseUp={() => setPressed(false)} 
              onMouseOut={() => setPressed(false)} 
              onTouchEnd={()=> setPressed(false)}
         className="relative w-full">
                    <div style={{backgroundColor: SecondaryColor}} 
                    className={`z-[-1] absolute top-[7px] w-full h-full 
                    rounded-md`}></div>

                    <button style={{backgroundColor: PrimaryColor}} 
                    className={`${pressed ? "press" : null} brighten z-50 text-white 
                    font-semibold px-2 py-2 w-full
                    rounded-md`}>Details Of Work</button>
         </div>
    )
    
}
