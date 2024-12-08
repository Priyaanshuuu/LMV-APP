import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import {app} from './app.js'
import connectDB from "./db/index.js"
import router from "./routes/user.route.js"


dotenv.config({
    path:'./env'
})

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:8000",
    credentials: true
}))

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 3000, ()=>{
        console.log(`Server is running on the port ${process.env.PORT}`);
        
    })
})
.catch((err)=>{
    console.log("MONGODB connection error",err);
    
})
app.use("/api/v1/user",router)
app.get("/home",(_,res)=>{
    res.status(200).json({
        success:true,
        message: "Hello The backend is working properly"
    })

})


