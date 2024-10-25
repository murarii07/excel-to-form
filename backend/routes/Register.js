import express from "express";
import { AuthStructure } from "../models/r.js";
export const Register = express.Router();
import { hashSync } from "bcrypt";
Register.post("/", async (req, res) => {
    try {
        const isUsernameExist=await AuthStructure.findOne({   username: req.body.username})
        if(isUsernameExist){
            throw new Error("username exist");   
        }
        //mongo operation
        const user = await AuthStructure.create({
            username: req.body.username,
            email: req.body.email,
            password: hashSync(req.body.password, 10)
        })
        await user.save()
        //after mongo operation

        res.status(200).json({
            success: true,
            message: "successfull register...."
        })
    }
    catch (e) {
        res.status(404).json({
            success: false,
            message:e.message
        })
    }
})
