export default function SectionHeading({color, heading}: 
{color:string, heading:string}) {
    return (
         <div className="absolute left-1/2 top-0 -translate-y-9
            lg:-translate-y-10 -translate-x-1/2 flex 
            justify-center mb-12">
                        
            <div className="w-fit relative">
                <h2 className={`w-full bg-${color}-300 font-bold text-4xl 
                lg:text-5xl text-white px-4 py-2 rounded-md`}>{heading}</h2> 
            </div>
         </div>
     )
}
