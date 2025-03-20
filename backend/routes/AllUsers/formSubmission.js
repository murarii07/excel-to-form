import express from "express";
import CryptoJS from "crypto-js";
import multer from "multer";
import blobFunction from "../../src/blobstorage.js";
export const formSubmissionRouter = express.Router();
import { EnvironmentVariables } from "../../config/config.js";
import { formInfo } from "../../models/FormInfoSchema.js";
import { AuthDB, UserDB } from "../../config/DBconfig.js";
import { formMetadataSchema } from "../../models/formMetadataSchema.js";
import { AuthStructure, } from "../../models/AuthSchema.js";
import { formResponse, formResponseSchema } from "../../models/formResponseSchema.js";
// // Multer memory storage configuration
const storage = multer.memoryStorage();
const upload = multer({ storage });

const decryptionObj = async (encryptedString) => {
    //this step have to do has we change / and + in _ and - for properly get encrypted url so we have reverse it for decrypt to maintain its format
    let encryptedUrl = encryptedString
        .replace(/_/g, "/")
        .replace(/-/g, "+")
    console.log(encryptedUrl)
    const jsonObjBytes = CryptoJS.AES.decrypt(encryptedUrl, EnvironmentVariables.encryptedSecretKey);
    console.log(jsonObjBytes)
    const jsonObj = await JSON.parse(jsonObjBytes.toString(CryptoJS.enc.Utf8));

    return jsonObj
}
// const getForm = async (req, res) => {
//     try {
//         console.log(req.params.encryptedUrl)
//         //decoding the url we get db and formId as col
//         let jsonObj = await decryptionObj(req.params.encryptedUrl)
//         // console.log("f", jsonObj)
//         const { user, id } = jsonObj
//         // console.log(id)
//         // let result = await DatabaseInstance.retriveData(user, id, {}, { projection: { _id: 0, fields: 1, title: 1, description: 1 } })
//         // let result = await DatabaseInstance.retriveData(USERDB, user, {}, { projection: { _id: 0, fields: 1, title: 1, description: 1 } })
//         let formModel = UserDB.model(user, formInfo, user)
//         let result = await formModel.findOne({ name: id }, { _id: 0, "fields": 1, "title": 1, "description": 1 })
//         console.log("GET FORM", result._doc,)
//         res.status(200).json({
//             data: result,
//             success: true,
//             message: "successfull...."
//         })
//     } catch (e) {
//         res.status(500).json({
//             data: null,
//             success: false,
//             message: e.message
//         })
//     }

// }
// const formResponse = async (req, res) => {
//     try {
//         // !req.body is used to check if req.body is "falsy. means empty or undefined or null"
//         if (!req.body || Object.keys(req.body).length == 0) {
//             return res.status(400).json({
//                 success: false,
//                 message: e.message
//             })
//         }
//         //decoding the url we get db and formId as col
//         let jsonObj = await decryptionObj(req.params.encryptedUrl)
//         const { user, id } = jsonObj
//         //$inc is used to increment the field by one
//         // await DatabaseInstance.UpdateData(USERDB, user,
//         //     { name: id },
//         //     {
//         //         "$set": { recentResponseTime: new Date().toLocaleString() },
//         //         "$inc": { response: 1 }
//         //     })
//         let formModel = UserDB.model(user, formInfo)
//         await formModel.updateOne({ name: id },
//             {
//                 "$set": { recentResponseTime: new Date().toLocaleString() },
//                 "$inc": { response: 1 }
//             })
//         console.log(user, id)
//         await blobFunction(user, id, JSON.stringify([req.body]))
//         // console.log("asasasasasasas")
//         res.status(200).json({
//             success: true,
//             message: "form response submission is successfull...."
//         })
//     } catch (e) {
//         console.log(e)
//         res.status(500).json({
//             data: null,
//             success: false,
//             message: e.message
//         })
//     }

// }
// //for public form

// formSubmissionRouter.route("/:encryptedUrl")
//     .get(getForm)
//     .post(upload.fields(), formResponse)


// Use app.route() when you need to handle multiple HTTP methods for the same URL path.
// formSubmissionRouter.get("/:encryptedUrl", getForm);
// //upload.none() for gving that user has not uploaded any file
// formSubmissionRouter.post("/:encryptedUrl", upload.none(), formResponse);



const getForm1 = async (req, res) => {
    try {
        console.log(req.params.encryptedUrl)
        //decoding the url we get db and formId as col
        let jsonObj = await decryptionObj(req.params.encryptedUrl)
        // console.log("f", jsonObj)
        const { user, id } = jsonObj
        console.log("IDDDDDDDDDDDDDD", id)
        let autcol = AuthStructure
        let userInfo = await autcol.findOne({ _id: user }, { _id: 1 })
        if (!userInfo) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        let formModel = UserDB.model("forms", formMetadataSchema, "forms")
        let result = await formModel.findOne({ user_id: userInfo._id, name: id }, { _id: 0, "fields": 1, "title": 1, "description": 1 })

        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Form not found."
            });
        }

        console.log("GET FORM", result)
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

}

const formResponse1 = async (req, res) => {
    try {
        // !req.body is used to check if req.body is "falsy. means empty or undefined or null"
        if (!req.body || Object.keys(req.body).length == 0) {
            return res.status(400).json({
                success: false,
                message: e.message
            })
        }
        //decoding the url we get db and formId as col
        let jsonObj = await decryptionObj(req.params.encryptedUrl)
        const { user, id } = jsonObj


        let autcol = AuthStructure
        let userInfo = await autcol.findOne({ _id: user }, { _id: 1 })
        if (!userInfo) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        //$inc is used to increment the field by one
        // await DatabaseInstance.UpdateData(USERDB, user,
        //     { name: id },
        //     {
        //         "$set": { recentResponseTime: new Date().toLocaleString() },
        //         "$inc": { response: 1 }
        //     })
        let formModel = UserDB.model("forms", formMetadataSchema, "forms")
        let metaData = await formModel.findOneAndUpdate(
            { user_id: userInfo._id, name: id },
            { "$inc": { response: 1 } },
            { "new": true } //this will help to return  updated document

        )
        if (!metaData) {
            return res.status(404).json({
                success: false,
                message: "Form not found."
            });
        }
        let formResponseModel = formResponse
        let result = new formResponseModel({
            form_id: metaData._id,
            response_data: req.body
        })
        await result.save();
        // await blobFunction(user, id, JSON.stringify([req.body]))
        console.log(result)
        res.status(200).json({
            success: true,
            message: "form response submission is successfull...."
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({
            data: null,
            success: false,
            message: e.message
        })
    }

}
formSubmissionRouter.route("/v1/:encryptedUrl")
    .get(getForm1)
    .post(upload.none(), formResponse1)