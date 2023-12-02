"use client"
import { useState } from "react"

export default function ContactForm() {
    const [pressed, setPressed] = useState(false)

    function submitHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
    }
    return (
        <form onSubmit={(e) => submitHandler(e)} name="contact" className="w-full
        md:w-5/12 bg-white 
        rounded-2xl relative p-4 pb-8 border-2 border-neutral-400">
            <div className="absolute top-2 left-2 bg-white w-full h-full 
                rounded-2xl border-2 border-neutral-400 z-[-1]"></div>
            <p className="flex flex-col my-4">
                <label className="text-red-400 font-semibold" htmlFor="name">Name</label>
                <input type="text" placeholder="Your name..."
                className="border border-red-300 outline-none rounded-md
                px-4 py-2"/>
            </p>
            <p className="flex flex-col my-4">
                <label className="text-red-400 font-semibold" htmlFor="name">Email</label>
                <input type="text" placeholder="example@email.com"
                className="border border-red-300 outline-none rounded-md
                px-4 py-2"/>
            </p>
            <p className="flex flex-col my-4">
                <label className="text-red-400 font-semibold" htmlFor="name">Message</label>
                <textarea placeholder="Let's connect and do some work together!"
                className="border border-red-300 outline-none rounded-md
                px-4 py-2"></textarea>
            </p>
            <div className="relative z-20">
                <div className="absolute top-[7px] bg-red-400 w-full h-full 
                rounded-md z-[-1]"></div>
                <button onMouseDown={() => setPressed(true)} 
              onTouchStart={()=> setPressed(true)}
              onMouseUp={() => setPressed(false)} 
              onTouchEnd={()=> setPressed(false)} 
                className={`${pressed ? 'press' : null} bg-red-300 text-white 
                w-full text-center py-3 rounded-md font-bold text-2xl
                brighten`} 
                type="submit">SEND</button>
            </div>
           

        </form>
    )
}
