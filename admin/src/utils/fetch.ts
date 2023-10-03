export async function get(endpoint:string) {
  try {
    const res = await fetch(`http://192.168.1.15:8080/v1/${endpoint}`)
    const resData = await res.json()
    return {payload: resData, error: false}
  } catch (err) {
    console.error(err)
    return {payload: err, error: true}
  }
}

export async function post(userInput:object, endpoint:string) {

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userInput)
  };
    try {

      const res = await fetch(`http://192.168.1.15:8080/v1/${endpoint}`, requestOptions)
      const resData = await res.json()
      return {payload: resData, error: false}
    } catch (err) {
      console.error(err) 
    }

}

export async function update(userInput:object, endpoint:string) {
   const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userInput)
  };

  try {
      const res = await fetch(`http://192.168.1.15:8080/v1/${endpoint}`, requestOptions)
      const resData = await res.json()
      return {payload: resData, error: false}
    } catch (err) {
      console.error(err) 
  }
}

export async function drop(userInput:object, endpoint:string) {
   const requestOptions = {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(userInput)
  }
  
  try {
  const res = await fetch(`http://192.168.1.15:8080/v1/${endpoint}`, requestOptions)
  const resData = await res.json()
  return {payload: resData, error: false}
  } catch (error) {
    console.error(error)    
  }
}
