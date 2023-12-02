
import LoadingScreen from "../components/LoadingScreen"
import Clock from "../components/Clock"
import Logo from "../components/Logo"
import NavBar from "../components/NavBar"
import MobileMenu from "../components/MobileMenu"
import RollingMascot from "../components/RollingMascot"
import SkillText from "../components/SkillText"
import AboutCard from "../components/AboutCard"
import Testimonials from "../components/Testimonials"
import HeaderVideo from "../components/HeaderVideo"
import ContactForm from "../components/ContactForm"
import SocialContacts from "../components/SocialContacts"
import SectionHeading from "../components/SectionHeading"
import Portfolio from "../components/Portfolio"

import { Monoton } from "next/font/google"

import "./main.css"
import "./animations.css"

const monoton = Monoton({
    weight: ['400'],
    style: ['normal'],
    subsets: ['latin'],
    display: 'swap',
})

const date = new Date()

const year = date.getFullYear()
const para1 = "My name is Aoife McNamara and I’m a recent graduate of Creative Digital Media (BA Hons), Munster Technological University. My main areas of interest and expertise are in video editing, filmmaking, creative coding and installation design."


const pages = [
   {
    ID: "home",
    Name: "home",
    TabColor: "#10b981",
    ItemOrder: 1
   }, 
    {
    ID: "about",
    Name: "about",
    TabColor: "#a5b4fc",
    ItemOrder: 2
   },
{
    ID: "portfolio",
    Name: "portfolio",
    TabColor: "#fca5a5",
    ItemOrder: 3
   },
{
    ID: "contact",
    Name: "contact",
    TabColor: "#93c5fd",
    ItemOrder: 3
   },
]

export default async function Home() {

    return (
        <>
            <HeaderVideo />
            <LoadingScreen />

            <div id="Home" className="relative xl:w-10/12 xl:mx-auto">
            
                <header className="relative flex justify-between h-[57px] 
                ml-4 mr-20  
                after:content-[''] after:border-t-orange-300 
                after:border-l-orange-300 after:border-t-[8px] 
                after:border-l-[8px] after:rounded-tl-2xl 
                after:absolute after:w-full after:h-4   
                after:top-[57px]">
                    <RollingMascot />
                    <Clock />
                    <Logo />
                    <NavBar pages={pages} />
                </header>

                <div className="pl-4 w-full h-screen absolute top-[57px] 
                left-0">

                    <div className="w-full h-2/6">
                        <div className="relative w-1/12 xl:w-2/12 h-full 
                        border-l-[8px] border-b-[8px] border-l-orange-300
                        border-b-orange-300 rounded-l-2xl">
                            <h1 className={`${monoton.className} 
                            text-6xl md:text-7xl lg:text-9xl  
                            absolute left-full top-full -translate-y-1/2 
                            pl-4 text-white`}>AOIFE</h1>
                        </div>
                    </div>

                    <div className="w-full mt-6 h-16 lg:h-32">
                        <div className="relative w-1/12 xl:w-3/12 h-full 
                        border-l-[8px] border-b-[8px] border-l-indigo-300 
                        border-b-indigo-300 rounded-bl-2xl">
                            <h1 className={`font-black 
                            text-5xl md:text-7xl lg:text-9xl  
                            absolute left-full top-full -translate-y-1/2 
                            pl-4 text-white`}>McNAMARA</h1>
                        </div>
                    </div>

                    <div className="w-full mt-6 h-16 lg:h-32">
                        <div className="relative w-1/12 lg:w-2/12 xl:w-4/12 h-full border-l-[8px] 
                        border-b-[8px] border-l-red-300 border-b-red-300 
                        rounded-bl-2xl">
                            <SkillText />
                        </div>
                    </div>
                </div>

                <aside>
                    <MobileMenu pages={pages} />
                </aside>
 
                {/*Spacer*/}
                <div className="h-screen"></div>

                {/*TESTIMONIALS SECTION*/}
                <section id="testimonials" className="flex flex-col 
                    justify-center items-center max-w-6xl h-[30rem] 
                    overflow-x-hidden mx-auto mb-32 lg:my-40">

                    <Testimonials/>
                </section>


                {/*ABOUT SECTION*/}
                <section id="About" className={`flex flex-col border-t-[10px] 
                    border-orange-200 relative max-w-6xl mx-auto pt-16`}>

                    <SectionHeading color="orange" heading="About Me"/>
                 <div className="flex justify-center flex-col
                    px-4 mx-auto w-full">
                        <AboutCard photo={"aoife_portrait.jpg"} alt={"Aoife's portrait"} text={para1} color={"bg-indigo-300"} mascot={true} />
                    </div>
                </section>

                {/*PORTFOLIO SECTION*/}
                <section id="Portfolio" className="flex flex-col border-t-[10px] 
                    border-indigo-200 relative max-w-6xl mx-auto mt-64 pt-16">

                    <SectionHeading color="indigo" heading="Portfolio"/>

                    <div className="h-screen flex justify-center flex-col px-4 mx-auto">
                        <Portfolio />
                    </div>
                </section>

                {/*CONTACT SECTION*/}
                <section id="Contact" className={`flex flex-col border-t-[10px] 
                    border-red-200 relative max-w-6xl mx-auto mt-64 py-16`}>

                    <SectionHeading color="red" heading="Contact"/>

                    <div className="px-4 mx-4">
                        <div className="flex flex-col lg:flex-row 
                        justify-around items-center mt-20">
                            <div className="relative flex flex-col  
                            justify-center">
                                <SocialContacts />
                            </div>
                            <p className="p-3 my-10 rounded-md font-bold text-white 
                            bg-red-400 text-4xl
                            ">Or</p>
                            <ContactForm/>
                        </div>
                    </div>
                </section>

                
            </div>
            <footer className="flex flex-col md:flex-row justify-center 
            text-white items-center w-full bg-blue-400 h-20">
                <p className="text-sm">Copyright {year}. All Rights Reserved 
                    <span className="font-bold"> AMagineMedia</span>
                </p>
            </footer>
        </>
    )
}
