import { EnvironmentVariables } from "./config.js"
import mongoose from "mongoose"

//createConnection is used when i want to connect two db in application
//go to DBconfig.js 
//createConnection is used when i want to connect two db in application
//go to DBconfig.js 

//auth db
export const UserDB = mongoose.createConnection(EnvironmentVariables.userDBUrl)
// export const modelObj = {}
UserDB.on("connected", () => {
    console.log("user DB connected ")
})
UserDB.on("error", (err) => {
    console.log("Error:", err)
})
UserDB.on("disconnected", () => {
    console.log("user DB disconnected")
})


//users form db
export const AuthDB = mongoose.createConnection(EnvironmentVariables.authDBUrl)
AuthDB.on("connected", () => {
    console.log("Auth DB connected ")
})
AuthDB.on("error", (err) => {
    console.log("Error:", err)
})
AuthDB.on("disconnected", () => {
    console.log("AUth DB disconnected")
})