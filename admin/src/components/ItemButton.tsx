
interface ButtonProps {
      name: string
      selHandler: (s: string) => void
      sel: string
}

const ItemButton = ({name, selHandler, sel}: ButtonProps) => {

    return <button className={` 
                    w-40 
                    my-4 
                    py-2 
                    text-center 
                    uppercase
                    rounded-lg
                    cursor-pointer  
                    font-semibold
                    ${sel === name ? "bg-zinc-800 text-slate-200" 
                                   : "text-zinc-800 bg-slate-100"}
                    `} 
         onClick={() => selHandler(name)}>{name}
    </button>
}

export default ItemButton
