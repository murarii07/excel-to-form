import express, { urlencoded } from "express";
import { router } from "./routes/generate.js";
import { liveFormRouter } from "./routes/liveForm.js";
import { login } from "./routes/login.js";
import { Register } from "./routes/Register.js";
import cors from 'cors';
import cookieParser from "cookie-parser";
import { formSubmissionRouter } from "./routes/formSubmission.js";
const port = 5000;
const app = express();
app.use(express.static("/home/murarii/workdir/excelToForm_Project/backend/public"))
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
// #registerd users
app.use("/user", liveFormRouter)

// #for all users
app.use("/form", router)
app.use("/public", formSubmissionRouter);


// #Authentication
app.use("/login", login)
app.use("/Register", Register)

app.get("/", (req, res) => {
    res
        .status(200)
        .json({
            success: true,
            message: "hell..."
        })
})

app.listen(port, () => {
    console.log("server started......")
});


// #when you are testing then add content type in header section in postwoman