
import stmodel from "./utils/stm.ts"
import df from "./utils/df.ts" 

import dotenv from "dotenv"
import mongoose from "mongoose"

// Load env variables
dotenv.config({ path: "../.env" })

mongoose.connect(process.env.MONGODB_URI || "")



const importData = async (model:string) => {
  try {
    if(!model) {
      return new Error("No model or data input in command")
    }

    await stmodel(model)?.create(df(model)) 
    console.log(`Data added: ${JSON.stringify(df(model))}`)
    process.exit()
  } catch (error) {
    console.error(error) 
  }

}

const deleteData = async (model:string) => {
  try {
      if(!model) {
      return new Error("No model input in command")
    }
 
    await stmodel(model)?.deleteMany()
    console.log(`Deleting everything from ${model}`)
    process.exit()
  } catch (error) {
    console.error(error)
  }
}

if (process.argv[2] === '-i') {
  importData(process.argv[3])
} else if (process.argv[2] === '-d') {
  deleteData(process.argv[3])
}
