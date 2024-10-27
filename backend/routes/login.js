import express from "express";
import { compareSync } from "bcrypt";
import { AuthStructure } from "../models/AuthSchema.js";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import { config } from "dotenv";
export const login = express.Router();
config() //loading the env file
mongoose.connect(`${process.env.MONGODB_URL}/ProjectAdmin`)
    .then(() => { console.log("login server connected"); })
    .catch(() => { console.log("login server failed"); })


login.post("/", async (req, res) => {
    //mongo operation
    try {
        const user = await AuthStructure.findOne({ username: req.body.username })
      //  console.log("ff", user)
        if (user) {
            const pas = compareSync(req.body.password, user.password);
            console.log(pas)
            if (pas) {
                //creating jwt 
                const payload = { user: user.username }
                const secretKey = process.env.JWT_SECRET_KEY
                const expireAge = 1000 * 60 * 60;
                let token = jwt.sign(payload, secretKey, { expiresIn: expireAge });

                // cookie
                res.status(200).cookie("jwt", token, {
                    maxAge: expireAge,
                    httpOnly: true,
                    path: "/"
                })
            }
            else {
                throw new Error("login failed");

            }
        }
        else {
            throw new Error("login failed");

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