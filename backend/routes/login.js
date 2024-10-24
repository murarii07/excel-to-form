import express from "express";
export const login= express.Router();
router.post("/", (req, res) => {
    //mongo operation
    //after mongo operation
    try {

        res.status(200).json({
            success: true,
            message: "successfull login...."
        })
    }
    catch (e) {
        res.status(404).json({
            success: false,
            message: "failure...."
        })
    }
})
