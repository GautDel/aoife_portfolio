import {useState} from "react"
const DataContainer = () => {
   const [DBItem, setDBItem] = useState({
        name: "hero text",
        text:  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi placerat accumsan purus in rutrum. In fringilla euismod consequat. Etiam fermentum, nisi vel rhoncus bibendum, nibh risus molestie quam, non facilisis elit libero quis ipsum. Proin nec massa a elit tincidunt facilisis. Ut lobortis bibendum euismod. Sed sollicitudin, quam ut ultrices dictum, felis leo convallis purus, imperdiet tincidunt ante quam nec lacus. Vivamus bibendum iaculis erat, at lobortis nibh dictum efficitur."
    })

    const [selected, setSelected] = useState({
        name: "hero text",
        text:  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi placerat accumsan purus in rutrum. In fringilla euismod consequat. Etiam fermentum, nisi vel rhoncus bibendum, nibh risus molestie quam, non facilisis elit libero quis ipsum. Proin nec massa a elit tincidunt facilisis. Ut lobortis bibendum euismod. Sed sollicitudin, quam ut ultrices dictum, felis leo convallis purus, imperdiet tincidunt ante quam nec lacus. Vivamus bibendum iaculis erat, at lobortis nibh dictum efficitur."
    })
    
    function inputHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setSelected({
            ...selected,
            [e.currentTarget.name]: e.currentTarget.value
        })
    }


    return (
              <div className="flex 
                              flex-col
                              bg-slate-100 
                              w-[94%]
                              h-[94%]
                              m-auto
                              pt-4
                              pb-16 
                              rounded-lg
                              overflow-y-scroll
                              border
                              border-slate-400
             ">

                    <p className="text-center
                                  text-3xl
                                  text-slate-700
                                  py-4
                                  border-b-2
                                  border-zinc-300
                                  mx-auto
                                  w-[90%]
                                  font-semibold">{DBItem.name}</p>


                    <p className="pt-6
                                  pb-10
                                  border-b-2
                                  border-zinc-300
                                  mx-auto
                                  w-[90%]
                                  text-md
                                  tracking-wide">{DBItem.text}</p>
                   
                    <form action="" className="w-[90%] mx-auto">
                        <p className="text-center
                                      text-2xl
                                      text-slate-700
                                      pt-4
                                      pb-2
                                      mx-auto
                                      w-[90%]
                                      font-semibold">Edit Data</p>
                        <p className="flex flex-col mb-6">
                            <label htmlFor="name" 
                            className="tracking-wide
                                       text-slate-700">Name</label>
                            <input 
                            id="name" 
                            type="text" 
                            name="name"
                            onChange={e => inputHandler(e)}
                            value={selected.name}
                            className="border-2 
                                       rounded-md 
                                       pl-2
                                       py-1
                                       bg-transparent
                                       text-slate-800
                                       focus:border-zinc-600
                                       outline-none
                                       border-zinc-400"/>

                        </p>
                        <p className="flex flex-col">
                            <label htmlFor="text"
                            className="tracking-wide
                                       text-slate-700">Text</label>
                            <textarea id="text" rows={8} 
                            name="text"
                            onChange={e => inputHandler(e)}
                            value={selected.text}
                            className="border-2 
                                       rounded-md 
                                       px-4
                                       py-2
                                       bg-transparent
                                       text-slate-800
                                       focus:border-zinc-600
                                       outline-none
                                       mb-8
                                       border-zinc-400"/>
                        </p>
                        <button type="submit"
                        className="bg-rose-500
                                   w-[100%]
                                   rounded-full
                                   py-[0.5rem]
                                   font-semibold 
                                   text-slate-200">EDIT</button>
                    </form>
       </div>
    )

}

export default DataContainer
