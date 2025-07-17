import express, { urlencoded } from "express"
import dotenv from "dotenv"
import cors from "cors"
import userRoute from "./routes/users.route.js"
dotenv.config()
const PORT=process.env.PORT || 3000
const app=express()
app.use(cors())
app.use(express.json())
app.use(urlencoded({ extended: true }));

app.use("/",(req,res)=>{
    res.send("Server is running..!")
})

app.use("/users",userRoute)

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);  
})