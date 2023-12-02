"use client"

import Image from "next/image"
import ProjectButton from "./ProjectButton"
import { useState } from "react"

type Project = {
    Client: string,
    ProjectName: string,
    Desc: string,
    Details: string,
    PrimaryColor: string,
    SecondaryColor: string,
    Img: string,
    Cat: string
}

type ToggleFunc = (i: number) => void


export default function ProjectCard({toggleCard, data, i, clickedCard}:
{toggleCard: ToggleFunc, data: Project, i: number, clickedCard: number}) {

    return(
        <div className="relative mb-20 mx-4 
        max-w-[22rem] sm:max-w-[18rem] md:max-w-[15rem] lg:max-w-[19rem] h-fit">
            {/* "Before Element"*/}
           <div className="border-2 border-neutral-300 absolute z-0 w-full 
           h-full top-2 left-1 rounded-2xl"></div>



           <div className="relative w-full bg-white border-2
           border-neutral-300 rounded-2xl rounded-tl-none
           z-20 pt-4 pb-8 px-4
           ">

            <div className="mx-auto h-fit my-4 relative rounded-full w-8/12">
                <div style={{backgroundColor: data.PrimaryColor}} 
                className={`absolute origin-center scale-[1.1]
                top-0 left-0 w-full h-full z-[-1] rounded-2xl`}></div> 
                <Image className="w-full rounded-xl" width="1000" height="1000" src={`/${data.Img}`} alt={data.Client}/>
            </div>


                 <p style={{backgroundColor: data.PrimaryColor}} 
                 className={`absolute px-4 py-2 rounded-t-2xl 
                 -left-[2px] -top-[40px] text-white font-bold`}>{data.Client}</p>

                <div className="flex flex-col justify-around h-56">
                
                    <p className="pt-2 text-neutral-700 mt-6 mb-8 overflow-hidden"><span className="font-bold text-neutral-700">Project:</span> {data.Desc}</p>

                    <ProjectButton 
                        ToggleCard={toggleCard} 
                        SecondaryColor={data.SecondaryColor} 
                        PrimaryColor={data.PrimaryColor} 
                        i={i} /> 
                </div>
           </div> 
        </div>
    )

}
