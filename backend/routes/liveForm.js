import express from "express";
export const liveFormRouter = express.Router();

router.post("/upload", (req, res) => {
    //mongo operation

    //here the data will be saveds in mongodb and give form id

    //after mongo operation
    try {

        res.status(200).json({
            data: [],
            success: true,
            message: "successfull...."
        })
    }
    catch (e) {
        res.status(404).json({
            data: [],
            success: false,
            message: "failure...."
        })
    }
})

router.get("/:formId", (req, res) => {
    //mongo operation

    //here the data will be taken out  from  mongodb using form Id
    const obj=[]

    //after mongo operation
    try {

        res.status(200).json({
            data: obj,
            success: true,
            message: "successfull...."
        })
    }
    catch (e) {
        res.status(404).json({
            data: [],
            success: false,
            message: "failure...."
        })
    }
})