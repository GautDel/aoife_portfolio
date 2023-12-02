import Image from "next/image"
export default function HeaderVideo() {
    
    return (
        <div className="w-[100vw] h-[100vh]  absolute left-0 border-5 top-0">
            <video className="hero-video" autoPlay loop muted playsInline src="../hero_test.mp4"></video>
                <div className="landscape:hidden md:landscape:block -translate-x-1/2 w-12 absolute bottom-4 left-1/2">
                    <Image className="animate-bounce w-full" width="100" height="100" src="/rmf_raised.png" alt="down-chevron"/>
                   <Image className="trampoline w-full" width="100" height="100" src="/down-chevron.png" alt="down-chevron"/>
                </div>
        </div>
    )
}
