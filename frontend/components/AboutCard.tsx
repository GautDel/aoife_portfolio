import Image from "next/image"
import CardMascot from "./CardMascot"




export default function AboutCard({photo, text, color, alt, mascot}: 
{photo: string, text: string, color: string, alt: string, mascot: boolean}) {

    return (
    <div className={`${color} relative flex-col md:flex md:flex-row-reverse 
    md:justify-around md:items-center rounded-2xl px-10 py-6 my-20
    before:content-[""] before:w-full before:z-[-1] before:h-full 
    before:rounded-2xl before:bg-white before:border-2
    before:cqw-anim-cont
    before:absolute before:top-[15px] before:left-2 before:border-neutral-400`}>
        {mascot ? <CardMascot /> : null}
        <div className="mx-auto md:mx-0 my-4 h-fit relative rounded-full z-10 
         w-8/12 md:w-3/12">
            <div className={` bg-white absolute origin-center scale-[1.1]
                top-0 left-0 w-full h-full z-[-1] rounded-full`}></div>
            <Image className="w-full rounded-full" width="1000" height="1000" src={`/${photo}`} alt={alt}/>
        </div>
        <div className="mt-16 flex-col md:w-6/12">
            <div className="w-fit relative">
                <p className="font-black text-3xl text-indigo-500 rounded-md border-neutral-400 bg-white w-fit py-2 px-4">Hey There!</p>
                <p className="my-8 text-lg lg:text-xl text-white tracking-wide">{text}</p>
            </div>
        </div>
    </div>
    )
}
