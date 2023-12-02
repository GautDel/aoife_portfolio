"use client"

import Image from "next/image"
import { useState } from "react"

export default function SocialContacts() {
    const [pressedInsta, setPressedInsta] = useState(false)
    const [pressedLink, setPressedLink] = useState(false)
    return (
    <>
        <p className="absolute text-white bg-red-300 bottom-full left-0 
        rounded-t-2xl px-3 py-2 font-bold">Find me here</p>
        
        <div className="relative px-6 py-10 z-10 bg-white rounded-2xl 
        rounded-tl-none border-2 border-neutral-400 w-fit">

            <div className="flex justify-evenly">
                <a href="https://instagram.com/amagine_media?igshid=OGQ5ZDc2ODk2ZA==" target="_blank">

                    <div onMouseDown={() => setPressedInsta(true)} 
                         onTouchStart={()=> setPressedInsta(true)}
                         onMouseUp={() => setPressedInsta(false)} 
                         onTouchEnd={()=> setPressedInsta(false)}
                         className="relative w-fit mr-4">

                        <div className="absolute top-[4px] left-[3px] 
                        bg-indigo-400 w-full h-full z-[-1] rounded-md "></div>

                        <div className={`${pressedInsta ? "press-ham" : null} p-2 
                        w-14 h-14 bg-indigo-300 rounded-md cursor-pointer`}>

                            <Image className="w-full" width="1000" height="1000" src={`/Instagram_Glyph_White.png`} alt="Instagram logo" />
                        </div>
                    </div>
                </a> 

                <a href="https://www.linkedin.com/in/aoife-mcnamara-a077a9206" target="_blank">
                    <div onMouseDown={() => setPressedLink(true)} 
                         onTouchStart={()=> setPressedLink(true)}
                         onMouseUp={() => setPressedLink(false)} 
                         onTouchEnd={()=> setPressedLink(false)} 
                         className="relative w-fit">

                        <div className="absolute top-[4px] left-[3px] 
                        bg-neutral-600 w-full h-full z-[-1] rounded-md "></div>

                        <div className={`${pressedLink ? "press-ham" : null} 
                        relative p-2 w-14 h-14 bg-white border border-neutral-400 
                        rounded-md cursor-pointer`}>
                
                            <Image className="w-full" width="1000" height="1000" src={`/LI-In-Bug.png`} alt="Instagram logo" />
                        </div>
                    </div>
                </a> 
            </div>

            <div className="relative bg-orange-300 text-white font-bold
            px-4 py-2 rounded-md mt-7 text-center w-fit mx-auto">
                <p>aoife.amcnamara@gmail.com</p>
            </div>
        </div>
    </>
    )
}
