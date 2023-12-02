"use client" 

import Quote from "./Quote"
import { Ultra } from "next/font/google"
import { useState, useEffect  } from "react"

export default function Testimonials() {
    const [current, setCurrent] = useState(0)
    const [anim, setAnim] = useState("card-slide")

    const data = [
        {
            name: "Judie Russell",
            company: "The Vidacademy",
            img: "aoife_portrait.jpg",
            quote: "Aoife impressed me with her creative, technical and professional abilities. She is excellent with clients, always takes initiative, and is an excellent team player",
            color: "#10b981"
        },
        {
            name: "Hilary Rose",
            company: "Live Wild Podcast",
            img: "aoife_portrait.jpg",
            quote: " Hilary rose here! she is awesome!!! ",
            color: "#a5b4fc"
        },
    ]


    useEffect(() => {
        const quoteInt = setInterval(() => {

            if(current === data.length - 1) {

                setCurrent(0)
                return
            }

            setCurrent(current + 1)

        }, 6000)
        return () => clearInterval(quoteInt)
    }) 

    function render() {
        return data.map((quote, i) => {
            return (
                <Quote key={i} data={data[current]} current={current} i={i}  />
            )
        })
    } 
       
    return (

    <div className="w-full h-full flex justify-center items-center px-4">
        {render()}
    </div>
    )

}
