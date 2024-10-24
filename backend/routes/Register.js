import express from "express";
export const Register= express.Router();

router.post("/", (req, res) => {
    //mongo operation


    //after mongo operation
    try {

        res.status(200).json({
            success: true,
            message: "successfull register...."
        })
    }
    catch (e) {
        res.status(404).json({
            success: false,
            message: "failure...."
        })
    }
})
