/* @Desc data formatting function that 
         takes input from cli qnd matches model 
         name to data file. 
         Data files MUST be pluralized version of Model. 
*/ 

import * as fs from "node:fs"

const df = (input: string) => {
  const data = JSON.parse(fs.readFileSync(`_data/${input.toLowerCase()}s.json`, "utf-8"))
  return data 
}

export default df
