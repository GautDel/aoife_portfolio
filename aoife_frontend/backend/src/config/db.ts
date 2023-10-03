import mongoose from 'mongoose'
const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      return new Error('MongoDB url not defined')
    }
    const connection = await mongoose.connect(process.env.MONGODB_URI)
    console.log(`Connected to ${connection.connection.host}`)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

export default connectDB
