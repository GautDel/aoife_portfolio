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

type ToggleDetails = () => void

export default function ProjectDetails({project, toggleDetails}: 
{project: Project, toggleDetails: ToggleDetails}) {
    return (
        <>

        <div  
        className="absolute top-0 left-0 w-full h-full z-30 flex  
        flex-col rounded-2xl bg-white overflow-y-hidden 
        overflow-x-hidden py-5 px-4">

        <div className="w-full h-fit relative flex flex-row-reverse">
        <div onMouseDown={() => toggleDetails()} 
                 onTouchStart={()=> toggleDetails()}
                  className="h-10 w-10 relative place-self-end">
                <div style={{backgroundColor: project.SecondaryColor}} 
                className="absolute w-full h-full top-[4px] left-[3px] z-[-1] 
                rounded-md "></div>
                <div style={{backgroundColor: project.PrimaryColor}} 
                className={` h-10 w-10 rounded-md cursor-pointer z-10 
                brighten`}>
                    <div className={`h-1 w-6 bg-white absolute top-1/2 left-1/2 
                    -translate-y-1/2 -translate-x-1/2 rotate-45`}></div>

                    <div className={`h-1 w-6 bg-white absolute top-1/2 left-1/2 
                    -translate-y-1/2 -translate-x-1/2 -rotate-45`}></div>
                </div>
            </div>

        </div>

            <p style={{color: project.PrimaryColor}}
            className="text-center mt-4 font-bold text-3xl">
                {project.ProjectName}
            </p>        
            <hr style={{borderColor: project.PrimaryColor}} 
            className="my-6 w-full mx-auto opacity-40 border"/>

            <div className="flex">
                <p style={{color: project.SecondaryColor}}
                className="font-bold border h-fit w-20">Client</p>
                <p style={{backgroundColor: project.SecondaryColor}} 
                className="text-white rounded-md 
                p-2">{project.Client}</p>
            </div>

            <div className="flex">
                <p style={{color: project.SecondaryColor}}
                className="font-bold border h-fit w-20">Project</p>
                <p style={{backgroundColor: project.SecondaryColor}} 
                className="text-white rounded-md 
                p-2">{project.Desc}</p>
            </div>

        </div>
        </>
    )
}
