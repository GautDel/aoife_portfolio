"use client"

import Image from "next/image"

import { useEffect, useState } from "react"

export default function LoadingScreen() {
    const [close, setClose] = useState(false)

    useEffect(() => {
        setTimeout(()=> {
            setClose(true)
        }, 3000)
    }, [setClose])
    return (
        <div className={`${!close ? null : "hidden"} close-load bg-indigo-300  fixed left-0 top-0 w-screen h-screen z-[999]
        loading-screen flex flex-col justify-center items-center`}>
        
            
            <div className="w-10/12 max-w-2xl flex flex-col ">

                <p className="bg-white rounded-full -translate-x-10 lg:-translate-x-32 px-4 py-4 self-center -rotate-[25deg] text-2xl mb-20 text-indigo-500 font-bold uppercase">Get the website ready!</p>
        <Image
            className="self-center"
            src="/rmf_loading.png"
            width={200}
            height={200}
            alt="Rolling mascot"
        />
                <div className="border-2 border-white rounded-md">

                     <div className="load bg-white w-full h-6"></div>
                </div>
            </div>
        </div>
    )

}
