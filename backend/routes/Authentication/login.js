import express from "express";
import { compareSync } from "bcrypt";
import jwt from 'jsonwebtoken';
import { EnvironmentVariables } from "../../config/config.js";
import { AuthStructure } from "../../models/AuthSchema.js";
import { AuthDB } from "../../config/DBconfig.js";
export const login = express.Router();
const loginUser = async (req, res) => {
    //mongo operation
    try {
        // const user = await AuthStructure.findOne({ username: req.body.username })

        const user = await AuthStructure.findOne({ username: req.body.username })
        // console.log("USER", user)
        console.log("USER", user)
        // if findOne doesnt find value then it return null in mongo
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "login failed ..."
            })
        }
        const psw = compareSync(req.body.password, user.password);
        // console.log(psw)
        if (!psw) {
            return res.status(400).json({
                success: false,
                message: "login failed ..."
            })
        }
        //creating jwt 
        //storing the _id instead of username
        const payload = { user: user._id }
        const secretKey = EnvironmentVariables.jwtScretKey
        const expireAge = 1000 * 60 * 60 * 60 * 60;
        let token = jwt.sign(payload, secretKey, { expiresIn: expireAge });
        // cookie
        res
            .cookie("jwt", token, {
                maxAge: expireAge,
                httpOnly: true,
                path: "/",
                secure: true,
                sameSite: "none",

            })
            .status(200)
            .json({
                success: true,
                message: "logged in"
            })
    }

    catch (e) {
        res.status(404).json({
            success: false,
            message: e.message
        })
    }
}
const logoutUser = (req, res) => {
    console.log("fsd", req.cookies?.jwt)
    //use end to make request end so  it should not be hanging state
    console.log("sd")
    if (req.cookies?.jwt) {
        res.clearCookie('jwt')
        return res.status(200).json({
            success: true,
            message: "succesfully logout...."
        })
    }
    else {
        res.status(404).json({
            success: false,
            message: "error"
        })
    }
}

login.route("/")
    .post(loginUser)
    .delete(logoutUser)


// login.post("/", loginUser)
// //logout
// login.delete('/', logoutUser)
