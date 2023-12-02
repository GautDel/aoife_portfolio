"use client"
import Image from "next/image"

import { useState } from "react"

interface Page {
    ID: string,
    Name: string,
    ItemShow: boolean,
    TabColor: string,
    ItemOrder: number
}


export default function MobileMenu({ pages }: { pages: Page[] }) {
    pages.sort((a, b) => a.ItemOrder - b.ItemOrder)

    const [toggle, setToggle] = useState(false)
    const [clicked, setClicked] = useState(false)
    const [pressed, setPressed] = useState(false)
    const [pressedHam, setPressedHam] = useState(false)
    const [selected, setSelected] = useState(0)


    function toggleHandler() {
        setToggle(!toggle)
        setClicked(true)
    }

    function render() {
        return pages.map((page: Page, i: number) => {
            return (
                <a   onMouseDown={() => (setPressed(true), setSelected(i))} 
                     onTouchStart={()=> (setPressed(true), setSelected(i))}
                     onMouseUp={() => (setPressed(false), setSelected(i))} 
                     onTouchEnd={()=> (setPressed(false), setSelected(i))}
                     onClick={() => setToggle(!toggle)} className="w-1/2 my-4" key={i} href={`#${page.Name}`}>
                    <div className="relative">
                        <div className={`${page.TabColor.replace("300", "400")} 
                    absolute rounded-2xl top-2 w-full h-full`}></div>
                        <p className={`${pressed && selected === i ?  "press-mob-menu" : null} ${page.TabColor} 
                    text-center text-white font-bold capitalize px-10 py-4 
                    rounded-tl-2xl rounded-2xl relative`}>
                            <span>{page.Name}</span>
                        </p>
                    </div>
                </a>
            )

        })
    }


    return (
        <nav className=" lg:hidden">
            

            <div className={`${toggle ? "flex slide-left" : "flex reverse-left"} 
        ${clicked ? "flex" : "hidden"}
        flex-col bg-orange-50 fixed top-0 translate-x-full w-screen h-screen 
        z-[60] justify-center items-center`}>
            <div className="absolute w-full h-full left-0 top-0 z-[-1]">
                <Image className="object-cover w-full h-full" width="1000" height="1000" src="/lines.png" alt="down-chevron"/>
            </div>
        {render()}</div>

            <div onMouseDown={() => setPressedHam(true)} 
                 onTouchStart={()=> setPressedHam(true)}
                 onMouseUp={() => setPressedHam(false)} 
                 onTouchEnd={()=> setPressedHam(false)}
                 onClick={toggleHandler} className="h-10 w-10 fixed top-4 
        z-[70] right-6">
                <div className="absolute w-full h-full top-[4px] left-[3px] bg-orange-400 
            z-[-1] rounded-md "></div>
                <div className={`${pressedHam ? "press-ham" : null} bg-orange-300 h-10 w-10 
            rounded-md cursor-pointer z-10 brighten`}>
                    <div id="bar-1" className={`${toggle ? "slide-top" : "reverse-top"} h-1 w-6 bg-white absolute top-2 left-1/2 -translate-x-1/2`}></div>
                    <div id="bar-2" className={`${toggle ? "fade" : null} h-1 w-6 bg-white absolute 
                top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2`}></div>
                    <div id="bar-3" className={`${toggle ? "slide-bottom" : "reverse-bottom"} h-1 w-6 bg-white absolute bottom-2 left-1/2 -translate-x-1/2`}></div>
                </div>
            </div>
        </nav>
    )
}
