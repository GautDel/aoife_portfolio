import {useState} from "react"
import ItemButton from "./ItemButton"

const SideNav = () => {
    // STATE
    const [sel, setSel] = useState("")

    // DATA 
    const textItems = [
        "nav items",
        "Website Name",
        "Hero Text",
        "Paragraph 1",
        "Paragraph 2",
        "Paragraph 3",
        "Paragraph 4",
        "Paragraph 5",
        "Paragraph 6",
        "Paragraph 7",
        "Paragraph 8",
        "Paragraph 9",
        "Paragraph 10",
        "Paragraph 11",
        "Paragraph 12",
        "Paragraph 13",
        "Paragraph 14",
    ]

    // FUNCTIONS
    function selHandler(name: string): void {
        setSel(name)
    }

    function renderItems() {
        return textItems.map((item, i) => {
            return(
                <ItemButton 
                    key={i}
                    name={item} 
                    selHandler={selHandler} 
                    sel={sel}
                />
             )
          }) 
     }

    return (
        <div className=" 
                        flex 
                        flex-col  
                        pt-4 
                        pb-16
                        px-5 
                        overflow-y-scroll 
                        bg-slate-700
                        h-full
                        w-fit">
            {renderItems()}
        </div>
    )
}

export default SideNav
