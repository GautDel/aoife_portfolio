import express from "express"

// Load env variables. Nothing above this except express import
import dotenv from "dotenv"
dotenv.config({path: ".env"})

// Load all other resources
import connectDB from "./config/db.ts"
import navItems from "./routes/navItems.ts"

// Connect to Database
connectDB()

// Initialise app
const app = express()

// Mount routes
app.use("/api/v1/navitems", navItems)

// Start listening...
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT} in ${process.env.NODE_ENV}`)
})
