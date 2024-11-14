import express from "express";
import CryptoJS from "crypto-js";
export const formSubmissionRouter = express.Router();
import { config } from "dotenv";
config() //loading the env file
import { DatabaseInstance } from "../Module.js";
import multer from "multer";
// // Multer memory storage configuration
const storage = multer.memoryStorage();
const upload = multer({ storage });


const decryptionObj = async (encryptedString) => {

    //this step have to do has we change / and + in _ and - for properly get encrypted url so we have reverse it for decrypt to maintain its format
    let encryptedUrl = encryptedString
        .replace(/_/g, "/")
        .replace(/-/g, "+")
    console.log(encryptedUrl)
    const jsonObjBytes = CryptoJS.AES.decrypt(encryptedUrl, process.env.ENCRYPTED_SECRET_KEY);
    console.log(jsonObjBytes)
    const jsonObj = await JSON.parse(jsonObjBytes.toString(CryptoJS.enc.Utf8));

    return jsonObj
}

//for public form
formSubmissionRouter.get("/:encryptedUrl", async (req, res) => {
    try {
        console.log(req.params.encryptedUrl)
        //decoding the url we get db and formId as col
        let jsonObj = await decryptionObj(req.params.encryptedUrl)
        console.log("f", jsonObj)
        const { user, id } = jsonObj
        console.log(id)
        /*
         let db = client.db(user);
         let col = db.collection(id);
         in findOne project is as parement in findOne
         let result = await col.findOne({},{projection:{_id:0,fields:1,title:1,description:1}});
        */
        let result = await DatabaseInstance.retriveData(user, id, {}, { projection: { _id: 0, fields: 1, title: 1, description: 1 } })
        console.log(result)
        res.status(200).json({
            data: result,
            success: true,
            message: "successfull...."
        })
    } catch (e) {
        res.status(500).json({
            data: null,
            success: false,
            message: e.message
        })
    }

});

//upload.none() for gving that user has not uploaded any file
formSubmissionRouter.post("/:encryptedUrl", upload.none(), async (req, res) => {
    try {
        //decoding the url we get db and formId as col
        let jsonObj = await decryptionObj(req.params.encryptedUrl)
        console.log("f", jsonObj)
        const { user, id } = jsonObj
        // let db = client.db(user);
        // let col = db.collection(id);
        console.log(req.body)
        // !req.body is used to check if req.body is "falsy. means empty or undefined or null"
        if (!req.body || Object.keys(req.body).length == 0) {
            return res.status(400).json({
                success: false,
                message: e.message
            })
        }
        // await col.insertOne(req.body)
        await DatabaseInstance.InsertData(user, id, req.body)
        res.status(200).json({
            success: true,
            message: "form response submission is successfull...."
        })
    } catch (e) {
        res.status(500).json({
            data: null,
            success: false,
            message: e.message
        })
    }

});