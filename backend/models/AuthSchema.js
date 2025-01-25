import { Schema } from "mongoose";

export const structure = Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true }
})


// first param is model name ,last name is collection name
// by default if collection name is not given then model function automaticaaly take model name as a col name
// export const AuthStructure =  model("AuthStructure", structure,"AuthStructureCol")
