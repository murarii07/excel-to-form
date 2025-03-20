import { Schema } from "mongoose";
import { UserDB } from "../config/DBconfig.js";
export const formResponseSchema = new Schema({
    // form_id  is like a Foreign key -> form_metadata._id
    form_id: { type: String, required: true }, // you can say _id of formMetaData
    response_data: { type: Object, required: true }, // Key-value pair of responses
    createdAt: { type: Date, default: Date.now() }
});
export const formResponse= UserDB.model("formResponse", formResponseSchema, "formResponse");
