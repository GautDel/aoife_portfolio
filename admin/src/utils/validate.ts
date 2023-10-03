export function validateStr(input:string, field:string):string {
  let msg = ""
  if(input.length <= 0) {
    msg = `${field} field cannot be empty` 
  }
  return msg
}

export function validateNum(input:any, field:string) {
  let validated = input;
  let msg = ""


    if (typeof validated === "string") {
      // Check if input is only numbers
      let isnum = /^\d+$/.test(validated)
      
      if(!isnum) {
        msg = `Only numbers are allowed in ${field} field`
      } else {
        validated = parseInt(validated) 
        console.log(validated)
        return validated
      } 
    }

    return msg
}
