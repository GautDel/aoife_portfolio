"use client"

import {useState} from "react"

import ProjectCard from "./ProjectCard"
import ProjectDetails from "./ProjectDetails"

export default function Portfolio() {
    const [focus, setFocus] = useState(0)
    const [currCat, setCurrCat] = useState("film")
    const [open, setOpen] = useState(false)
    const [clickedCard, setClickedCard] = useState(-1)

    const categories = [
        "film",
        "photo",
        "editing",
    ]

    const projects = [
        {
            Client: "Hilary Rose",
            ProjectName: "Live Wild Podcast",
            Desc: "Vestibulum sed dapibus urna, eu lacinia erat. Duis eleifend at urna id pellentesque. Phasellus semper, est nec mollis suscipit, risus nisi volutpat augue",
            Details: "",
            PrimaryColor: "#93c5fd",
            SecondaryColor: "#60a5fa",
            Img: "aoife_portrait.jpg",
            Cat: "film"

        },
        {
            Client: "Judie",
            ProjectName: "The Vidacademy", 
            Desc: "Vestibulum sed dapibus urna, eu lacinia erat. Duis eleifend at urna id pellentesque. Phasellus semper, est nec mollis suscipit, risus nisi volutpat augue",
            Details: "",
            PrimaryColor: "#fca5a5",
            SecondaryColor: "#f87171",
            Img: "aoife_portrait.jpg",
            Cat: "film"

        },
 
        {
            Client: "Judie",
            ProjectName: "The Vidacademy", 
            Desc: "Vestibulum sed dapibus urna, eu lacinia erat.Vestibulum sed dapibus urna, eu lacinia erat.Vestibulum sed dapibus urna, eu lacinia erat.Vestibulum sed dapibus urna, eu lacinia erat.Vestibulum sed dapibus urna, eu lacinia erat. Dus eleifend at urna id pellentesque. Phasellus semper, est nec mollis suscipit, risus nisi volutpat augue",
            Details: "",
            PrimaryColor: "#fdba74",
            SecondaryColor: "#fb923c",
            Img: "aoife_portrait.jpg",
            Cat: "photo"
        },
        {
            Client: "Judie",
            ProjectName: "The Vidacademy", 
            Desc: "Vestibulum sed dapibus urna, eu lacinia erat.Vestibulum sed dapibus urna, eu lacinia erat.Vestibulum sed dapibus urna, eu lacinia erat.Vestibulum sed dapibus urna, eu lacinia erat.Vestibulum sed dapibus urna, eu lacinia erat. Dus eleifend at urna id pellentesque. Phasellus semper, est nec mollis suscipit, risus nisi volutpat augue",
            Details: "",
            PrimaryColor: "#86efac",
            SecondaryColor: "#4ade80",
            Img: "aoife_portrait.jpg",
            Cat: "photo"
        },
 
        {
            Client: "Judie",
            ProjectName: "The Vidacademy", 
            Desc: " at urna id pellentesque. Phasellus semper, est nec mollis suscipit, risus nisi volutpat augue",
            Details: "",
            PrimaryColor: "#a5b4fc",
            SecondaryColor: "#818cf8",
            Img: "aoife_portrait.jpg",
            Cat: "film"
        },
        {
            Client: "Judie",
            ProjectName: "The Vidacademy", 
            Desc: " at urna id pellentesque. Phasellus semper, est nec mollis suscipit, risus nisi volutpat augue",
            Details: "",
            PrimaryColor: "#a5b4fc",
            SecondaryColor: "#818cf8",
            Img: "aoife_portrait.jpg",
            Cat: "film"
        },
 
        {
            Client: "Judie",
            ProjectName: "The Vidacademy", 
            Desc: " at urna id pellentesque. Phasellus semper, est nec mollis suscipit, risus nisi volutpat augue",
            Details: "",
            PrimaryColor: "#fca5a5",
            SecondaryColor: "#f87171",
            Img: "aoife_portrait.jpg",
            Cat: "editing"
        },
        {
            Client: "Judie",
            ProjectName: "The Vidacademy", 
            Desc: " at urna id pellentesque. Phasellus semper, est nec mollis suscipit, risus nisi volutpat augue",
            Details: "",
            PrimaryColor: "#fca5a5",
            SecondaryColor: "#f87171",
            Img: "aoife_portrait.jpg",
            Cat: "editing"
        },



    ]

    



    function render() {
        return categories.map((cat, i) => {
           return (
            <div onClick={() => (setFocus(i), setCurrCat(cat))} className={`
            ${i === 0 ? "translate-x-12 bg-orange-300 hover:bg-orange-400" : null}
            ${i === 1 ? "translate-x-6  bg-indigo-300 hover:bg-indigo-400" : null}
            ${i === 2 ? "bg-red-300 hover:bg-red-400" : null}
            ${focus === i ? "z-50" : null}
            px-8 py-2 rounded-t-2xl h-full text-white font-bold cursor-pointer`} key={i}>
                <span className="capitalize">{cat}</span>
            </div>
           ) 
        })
    }

    function renderProjects() {
        return projects.map((proj, i) => {
            if(proj.Cat === currCat) {
                 return (
                    <ProjectCard 
                        toggleCard={toggleCard} 
                        key={i} 
                        data={proj} 
                        i={i} 
                        clickedCard={clickedCard} />
                )
            }
        }) 
    }

    function toggleCard(i: number) {

        if(!open) {

            setOpen(true)
            setClickedCard(i)        
        } else {

            setOpen(false)
            setClickedCard(i)
        }
    }

    function toggleDetails() {
        setClickedCard(-1) 
    }

    return (
    <>
        
        <div className={`relative  bg-white flex-col rounded-2xl  
        h-3/4 border-neutral-400 border-2
        before:content-[""] before:w-full before:z-[-1] before:h-full 
        before:rounded-2xl before:bg-white before:border-2
        before:absolute before:top-[-15px] before:rounded-tr-none
        before:left-0 before:border-neutral-400 `}>
            <div className="flex justify-center absolute -top-[53px] right-0">{render()}</div>
            <div className="flex flex-col sm:flex-row sm:flex-wrap pt-14 px-4 
            items-center sm:justify-evenly h-full overscroll-y-contain 
            overflow-y-scroll overflow-x-hidden">
            
                {clickedCard != -1 ?
                    <ProjectDetails toggleDetails={toggleDetails} project={projects[clickedCard]}/>
                    : null
                }
                
                {renderProjects()} 
            </div>
        </div>
    </>
    
    )
}
