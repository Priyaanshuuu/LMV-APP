import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type:email,
        required:true
    },
    password:{
        type:String,
        required: true

    },
    role:{
        type:String,
        enum:["instructor","student"],
        default: "student"
    },
    enrollCourses:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Course'
        }
    ],
    photoUrl:{
        type:String,
        default:""
    }
},{timestamps:true})

export const User = mongoose.model("User",userSchema) 