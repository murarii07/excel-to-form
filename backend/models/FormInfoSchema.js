import { Schema } from "mongoose";

//timestamps 
// please read this

export const formInfo = Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    title: { type: String, required: true, },
    fields: { type: Array, required: true },
    description: { type: String },
    response: { type: Number, required: true, default: 0 },
    recentResponseTime: { type: String },
    timeStamp: { type: String }

}, { timestamps: true, _id: false })

//here i specify _id as false to not create by deafult and as i want create 
// a customise _id 
// { timestamps: true } in this two keyvalues pairs get generated at the time of dovument creation created_at ,updated_at more info read docs


// as i want to create model for every user thats why i exported schema
// export const users = model("Users", formInfo)