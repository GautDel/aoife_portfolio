"use client"

import { useState, useEffect } from "react"

export default function SkillText() {
    const [step, setStep] = useState(0)
    
    useEffect(() => {
        function cycle() {
            if(step < 4) {
                setStep(step + 1)
            } else {
                setStep(1)
            }  
            
        }

        const timer = setInterval(() => {
            cycle()
        }, 4000)

        return () => clearInterval(timer)

    }, [step])
    
    return(
    <div className={`text-3xl md:text-4xl font-semibold    
    w-[250px] md:w-[300px] h-[55px] pl-8  
    absolute left-full top-full -translate-y-1/2 
    text-white cube-wrapper`}>

    
    <div className={`flex justify-center items-center absolute w-full h-full rotate-cube-${step}`}>

    <div className="h-16 w-full flex justify-center items-center text-center 
    bg-blue-300 absolute cube-top ">
    <p>Photographer</p>
    </div>

    <div className="h-16 w-full flex justify-center items-center text-center 
    bg-red-300 absolute cube-back ">
    <p>Video Editor</p>
    </div>

    <div className="h-16 w-full flex justify-center items-center text-center 
    bg-indigo-300 absolute cube-bottom ">
    <p>Film Maker</p>
    </div>

    <div className="h-16 w-full flex justify-center items-center text-center 
    bg-orange-300 absolute cube-front ">
    <p>Designer</p>
    </div> 
    </div>
    </div>
    )
}
