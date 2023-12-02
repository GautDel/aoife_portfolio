import Image from "next/image"
import { Ultra } from "next/font/google"

const ultra = Ultra({
    weight: ['400'],
    style: ['normal'],
    subsets: ['latin'],
    display: 'swap',
})


type Quote = {
    name: string,
    company: string,
    img: string,
    quote: string,
    color: string
}

export default function Quote({data, current, i}: 
{data: Quote, current: number, i:number}) {
    
    return (
        <div className={`${current === i ? "block" : "hidden"} relative w-full 
        max-w-xl h-fit `}>
             <div className={`${current === i ? "card-slide-left" : null} 
             absolute top-3 left-2 w-full h-full z-[-1] bg-white border-2 
             border-neutral-400 rounded-2xl`}></div>

                    <div className={`${current === i ? "card-slide-right" : null} 
                    p-4 bg-white rounded-2xl border-2 border-neutral-400 
                    relative `}>

                        <Image  style={{borderColor: data.color}}
                        className={`absolute right-4 top-4 w-20 rounded-full 
                        border-4`} 
                        width="100" 
                        height="100" 
                        src={`/${data.img}`} 
                        alt={data.name}/>
 

                        <p style={{color: data.color}} 
                        className={`${ultra.className} self-start text-5xl 
                        text-orange-300`}>&quot;</p> 
 
                        <div className="flex flex-row pb-2 mt-4 ">

                            <p style={{color: data.color}} 
                            className="font-bold"> {data.name}</p>

                            <p className="text-neutral-400 px-2 font-light">
                            -</p>

                            <p className="text-neutral-400 font-light">
                            {data.company}</p>
                    </div>

                    <div className="flex flex-col ">

                        <p style={{backgroundColor: data.color}} 
                        className="rounded-md w-full p-3 text-white
                        ">{data.quote}</p>

                        <p style={{color: data.color}} 
                        className={`${ultra.className} text-5xl self-end 
                        rotate-180`}>&quot;</p> 
                    </div>    
                    </div>
                   
                    
                </div>       
    )
}
