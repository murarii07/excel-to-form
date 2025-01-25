// you can use the jwt and signed cookie together to improve the security to add one more layer of security
import express from "express";
import { liveFormRouter } from "../routes/SignedUsers/liveForm.js";
import { login } from "../routes/Authentication/login.js";
import { Register } from "../routes/Authentication/Register.js";
import { formSubmissionRouter } from "../routes/AllUsers/formSubmission.js";
import { router } from "../routes/AllUsers/generate.js";
import cors from 'cors';
import { resolve } from 'path'
import cookieParser from "cookie-parser";
import { EnvironmentVariables } from "../config/config.js";
const port = EnvironmentVariables.port || 3000;
const app = express();



//MiddleWares
app.use(express.static(resolve(`${EnvironmentVariables.publicPathDirectory}/public`)))
app.use(cors({
    origin: EnvironmentVariables.clientUrl, // Change to your frontend's URL
    credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//if use signed cookie then i need to add  secret key also
app.use(cookieParser(EnvironmentVariables.cookieSecretKey))

// if use cookie then i need to add  below code only
// app.use(cookieParser())


// #Signed users
app.use("/user", liveFormRouter)

// #for all users
app.use("/form", router)
app.use("/public", formSubmissionRouter);


// #Authentication
app.use("/login", login)
app.use("/Register", Register)


app.listen(port, () => console.log("server started......", port));


// #when you are testing then add content type in header section in postwoman