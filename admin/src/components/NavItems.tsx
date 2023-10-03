import { useState, useEffect} from 'react';
import {get, post, drop, update} from '../utils/fetch';
  
const NavItems = () => {
  interface navItemType {
    name: string
    item_order: string | number
    item_show: boolean
  }

  const defaultInput =  {
      name: "",
      item_order: "",
      item_show: true  
  }
  const [data, setData] = useState()
  const [input, setInput] = useState<navItemType>(defaultInput)
  const [error, setError] = useState("")
  const [id, setId] = useState({name_2: ""})
  const [edit, setEdit] = useState(false)
 
  useEffect(() => {
      const fetchData = async () => {
          const navitems = await get("navitem")
          if (!navitems.error) setData(navitems.payload)
      } 

      fetchData()
  }, []);


  function renderItems(data:any) {
    interface dataItem {
        Name: string,
        ItemOrder: number,
        ItemShow: boolean
      } 

    const dataArr = data

    return dataArr.map((item:dataItem, i:number) => {
        return   <li key={i}> 
                   <span onClick={() => setEditVars(item.Name, item.Name, item.ItemOrder, item.ItemShow)}>E </span>
                   <span> {item.Name} </span>
                   <span> {item.ItemOrder} </span>
                   <span> {item.ItemShow ? "true" : "false"} </span>
                   <span onClick={() => drop({name: item.Name}, "navitem")}> X</span>

                 </li>
      })
  }

  function inputHandler(e:any) {
    const target = e.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    setInput((prev) => {
        return {...prev, 
        [target.name]: value,
        }
      })

  }

  function setEditVars(name:string, name_2:string, item_order:number, item_show:boolean) {
    setEdit(true)
    setId({name_2})
    setInput({name, item_order, item_show})
  }

  function validation() {
    let input2Send = input

    if(input2Send.name.length <= 0) {
      setError("Name field cannot be empty")
      return
    }

    if (typeof input2Send.item_order === "string") {
      // Check if input is only numbers
      let isnum = /^\d+$/.test(input2Send.item_order)
      
      if(!isnum) {
        setError("Only numbers are allowed in 'item order' field")
        return
      } else {
        input2Send.item_order = parseInt(input2Send.item_order) 

      } 
    }

    if(edit) {
      input2Send = {...input2Send, ...id}

      setError("Successfully updated nav item!")
      update(input2Send, "navitem")
    } else {
          setError("Successfully created nav item!")
      post(input2Send, "navitem")
    }

  }

  function submitHandler(e:any) {
    e.preventDefault()
    validation()  
  }



  return (
    <div>
      <ul>
        {data ? renderItems(data) : <p>Loading...</p>} 
      </ul>
      <form onSubmit={submitHandler}>
      <p>{error}</p>
      <p>{edit ? `Editing ${id.name_2}` : null}</p>
        <input type="text" placeholder="name" value={input.name} name="name" onChange={inputHandler}/>
        <input type="text" placeholder="1" value={input.item_order} name="item_order" onChange={inputHandler}/>
        <label>
        Show <input type="checkbox" checked={input.item_show} name="item_show" onChange={inputHandler}/>
        </label>
        <input type="submit" value={edit ? "edit" : "submit"}/>
      </form>

          </div>
  )
}

export default NavItems
