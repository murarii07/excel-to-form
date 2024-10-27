import express from "express";
import { MongoClient } from "mongodb";
import CryptoJS from "crypto-js";
export const formSubmissionRouter = express.Router();
import { config } from "dotenv";
config() //loading the env file
const client = new MongoClient(process.env.MONGODB_URL);


const decryptionObj = async (encryptedString) => {
    const jsonObjBytes = CryptoJS.AES.decrypt(encryptedString, process.env.ENCRYPTED_SECRET_KEY);
    const jsonObj = await JSON.parse(jsonObjBytes.toString(CryptoJS.enc.Utf8));
    console.log(jsonObj)
    return jsonObj
}

formSubmissionRouter.get("/:encryptedUrl", async (req, res) => {
    try {

        //decoding the url we get db and formId as col
        let jsonObj = await decryptionObj(req.params.encryptedUrl)
        console.log("f", jsonObj)
        const { user, formId } = jsonObj
        let db = client.db(user);
        let col = db.collection(formId);
        let result = await col.find({}).toArray();
        res.status(200).json({
            data: result,
            success: true,
            message: "successfull...."
        })
    } catch (e) {
        res.status(404).json({
            data: null,
            success: false,
            message: "failure...."
        })
    }

});


formSubmissionRouter.post("/:encryptedUrl", async (req, res) => {
    try {
        //decoding the url we get db and formId as col
        let jsonObj = await decryptionObj(req.params.encryptedUrl)
        console.log("f", jsonObj)
        const { user, formId } = jsonObj
        let db = client.db(user);
        let col = db.collection(formId);
        await col.insertOne(req.body);
        res.status(200).json({
            data: [{ url: "url" }],
            success: true,
            message: "form response submission is successfull...."
        })
    } catch (e) {
        res.status(404).json({
            data: null,
            success: false,
            message: "failure...."
        })
    }

});