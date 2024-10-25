import mongoose, { mongo } from "mongoose";

const structure=new mongoose.Schema({
    username:{type:String,required:true},
    password:{type:String,required:true},
    email:{ type: String, required: false }
})

export const  AuthStructure= new mongoose.model("AuthStructure",structure)