import express from "express";
import { AuthStructure } from "../../models/AuthSchema.js";
export const Register = express.Router();
import { hashSync } from "bcrypt";
const registerUser=async (req, res) => {
    try {
        if(!req.body){
            return res.status(400).json({
                 success: false,
                 message:"bad request"
             })
         }
        const isUsernameExist = await AuthStructure.findOne({ username: req.body.username })
        const isEmailExist = await AuthStructure.findOne({ email: req.body.email })
        console.log("dfdsf",isEmailExist,isUsernameExist,isUsernameExist && isEmailExist)
        if (isUsernameExist || isEmailExist) {
            return res.status(400).json({
                success: false,
                message: "invalid fields value...."
            })
        }
        //mongo operation
        //using create we do not need to save it manually user.save() not needed
        const { username, password, email } = req.body
        AuthStructure.create({
            username: username,
            email: email,
            password: hashSync(password, 10)
        })
        .then(()=>{
            res.status(200).json({
                success: true,
                message: "successfull register...."
            })
        })
        .catch((error) => {
            return res.status(500).json({
                success: false,
                message: error
            })
        })
        
    }
    catch (e) {
        res.status(401).json({
            success: false,
            message: e.message
        })
    }
}
Register.post("/",registerUser )