import express from "express";
import CryptoJS from "crypto-js";
import multer from "multer";
import blobFunction, { storingFiles } from "../../src/blobstorage.js";
export const formSubmissionRouter = express.Router();
import { EnvironmentVariables } from "../../config/config.js";
// import { formInfo } from "../../models/FormInfoSchema.js";
import { AuthDB, UserDB } from "../../config/DBconfig.js";
import { formMetadataSchema } from "../../models/formMetadataSchema.js";
import { AuthStructure } from "../../models/AuthSchema.js";
import { formResponse } from "../../models/formResponseSchema.js";
import { BSON } from "bson";
// // Multer memory storage configuration
const storage = multer.memoryStorage();
const upload = multer({ storage });

const decryptionObj = async (encryptedString) => {
    //this step have to do has we change / and + in _ and - for properly get encrypted url so we have reverse it for decrypt to maintain its format
    let encryptedUrl = encryptedString.replace(/_/g, "/").replace(/-/g, "+");
    console.log(encryptedUrl);
    const jsonObjBytes = CryptoJS.AES.decrypt(
        encryptedUrl,
        EnvironmentVariables.encryptedSecretKey
    );
    console.log(jsonObjBytes);
    const jsonObj = await JSON.parse(jsonObjBytes.toString(CryptoJS.enc.Utf8));

    return jsonObj;
};
const formMiddleware = async (req, res, next) => {
    console.log(req.params.encryptedUrl);
    //decoding the url we get db and formId as col
    let jsonObj = await decryptionObj(req.params.encryptedUrl);
    const { user, id } = jsonObj;
    console.log("IDDDDDDDDDDDDDD", id);
    let autcol = AuthStructure;
    let userInfo = await autcol.findOne({ _id: user }, { _id: 1 });
    if (!userInfo) {
        return res.status(404).json({
            success: false,
            message: "User not found.",
        });
    }
    req.userInfo = {
        userId: userInfo._id,
        formName: id,
    };
    next();
};


const getForm1 = async (req, res) => {
    try {
        let formModel = UserDB.model("forms", formMetadataSchema, "forms");
        let result = await formModel.findOne(
            { user_id: req.userInfo.userId, name: req.userInfo.formName },
            { _id: 0, fields: 1, title: 1, description: 1 }
        );

        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Form not found.",
            });
        }

        console.log("GET FORM", result);
        res.status(200).json({
            data: result,
            success: true,
            message: "successfull....",
        });
    } catch (e) {
        res.status(500).json({
            data: null,
            success: false,
            message: e.message,
        });
    }
};

const formResponse1 = async (req, res) => {
    try {
        // !req.body is used to check if req.body is "falsy. means empty or undefined or null"
        if (!req.body || Object.keys(req.body).length == 0) {
            return res.status(400).json({
                success: false,
                message: "requst error",
            });
        }
        //$inc is used to increment the field by one
        // await DatabaseInstance.UpdateData(USERDB, user,
        //     { name: id },
        //     {
        //         "$set": { recentResponseTime: new Date().toLocaleString() },
        //         "$inc": { response: 1 }
        //     })
        let formModel = UserDB.model("forms", formMetadataSchema, "forms");
        let metaData = await formModel.findOneAndUpdate(
            { user_id: req.userInfo.userId, name: req.userInfo.formName },
            { $inc: { response: 1 } },
            { new: true } //this will help to return  updated document
        );
        if (!metaData) {
            return res.status(404).json({
                success: false,
                message: "Form not found.",
            });
        }

        let file_metadata = [];
        let storage = 0;
        for await (const file of req.files) {
            let r = await storingFiles(
                metaData._id,
                file.originalname,
                file.buffer,
                file.mimetype
            );
            console.log(r);
            storage += file.size
            //extracting buffer key
            // ...fileWithoutBuffer i act like  the rest operator.
            const { buffer, ...fileWithoutBuffer } = file;
            file_metadata.push({ ...fileWithoutBuffer, file_url: r });
        }
        console.log(file_metadata);
        let formResponseModel = formResponse;
        let result = new formResponseModel({
            form_id: metaData._id,
            response_data: req.body,
            file_metadata: file_metadata,
        });
        await result.save();
        // console.log("STORAGE",Object.bsonsize(result))

        // await blobFunction(user, id, JSON.stringify([req.body]))
        storage += BSON.calculateObjectSize(result.toObject())
        console.log("STORAHE", storage)

        //updating storage field  .  Document which return the doc  we can update it futher and save using below method
        metaData.storage = metaData.storage + storage;
        metaData.save();
        // console.log(result.);
        res.status(200).json({
            success: true,
            message: "form response submission is successfull....",
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            data: null,
            success: false,
            message: e.message,
        });
    }
};
formSubmissionRouter.get("/v1/:encryptedUrl", formMiddleware, getForm1)
formSubmissionRouter.post("/v1/:encryptedUrl", upload.array("file"), formMiddleware, formResponse1);
