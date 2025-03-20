import { Schema } from "mongoose";
import {AuthDB} from '../config/DBconfig.js'
const structure = Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() }
})

export const AuthStructure = AuthDB.model("AuthStructure", structure, "AuthStructure")
// first param is model name ,last name is collection name
// by default if collection name is not given then model function automaticaaly take model name as a col name
// export const AuthStructure =  model("AuthStructure", structure,"AuthStructureCol")
