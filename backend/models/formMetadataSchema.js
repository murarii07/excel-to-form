import { Schema } from "mongoose";
import { UserDB } from "../config/DBconfig.js";
//timestamps 
// please read this

export const formMetadataSchema = new Schema({
    url: { type: String, required: true },
    user_id: { type: String, required: true },   //_id of user auth info 
    name: { type: String, required: true },
    title: { type: String, required: true, },
    fields: { type: Array, required: true },
    description: { type: String },
    response: { type: Number, required: true, default: 0 },

}, { timestamps: true })
export const formMetadata=UserDB.model("forms", formMetadataSchema, "forms")
