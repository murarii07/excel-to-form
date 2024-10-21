import express, { urlencoded } from "express";
import { router } from "./routes/generate.js";
import cors from 'cors';
const port = 5000;
const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:false}));
const formId=[];
app.use("/form", router)
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
