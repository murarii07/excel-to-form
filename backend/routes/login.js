import express from "express";
import { compareSync } from "bcrypt";
import { AuthStructure } from "../models/AuthSchema.js";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import { config } from "dotenv";
config() //loading the env file
export const login = express.Router();
mongoose.connect(`${process.env.MONGODB_URL}/ProjectAdmin`)
    .then(() => { console.log("Authentication server connected"); })
    .catch(() => { console.log("Authentication server failed"); })


login.post("/", async (req, res) => {
    //mongo operation
    try {
        const user = await AuthStructure.findOne({ username: req.body.username })
        console.log("ff", user)
        if (user) {
            const psw = compareSync(req.body.password, user.password);
            console.log(psw)
            if (psw) {
                //creating jwt 
                const payload = { user: user.username }
                const secretKey = process.env.JWT_SECRET_KEY
                const expireAge = 1000 * 60 * 60;
                let token = jwt.sign(payload, secretKey, { expiresIn: expireAge });

                // cookie
                res
                    .cookie("jwt", token, {
                        maxAge: expireAge,
                        httpOnly: true,
                        path: "/",
                        secure: true,
                        sameSite:"none",
                        
                    })
                    .status(200)
                    .json({
                        success: true,
                        message: "logged in"
                    })
            }
            else {
                throw new Error("logins failed");

            }
        }
        else {
            throw new Error("loginaa failed");

        }
    }

    catch (e) {
        res.status(404).json({
            success: false,
            message: e.message
        })
    }
})

//logout
login.delete('/', (req, res) => {
    res.status(204).clearCookie('jwt')
})
