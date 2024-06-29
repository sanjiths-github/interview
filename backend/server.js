import express from "express";
import dotenv from 'dotenv'
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoute.js'
import itemRoutes from "./routes/itemRoute.js";
import cors from 'cors'




dotenv.config()

connectDB()



const app = express()

app.use(cors())
app.use(express.json())


app.use('/api/V1/auth', authRoutes)
app.use("/api/v1/item", itemRoutes);



const PORT = process.env.PORT 

app.listen(PORT,()=>{
    console.log(`server runing on ${PORT}`)
})