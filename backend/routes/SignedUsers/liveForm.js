import express from "express";
import CryptoJS from "crypto-js";
import jwt from 'jsonwebtoken'
// import { DatabaseInstance, MongooseDb } from "../../src/Module.js";
import { deletingBlob, getBlobSize } from "../../src/blobstorage.js";
import { EnvironmentVariables } from "../../config/config.js";
// import { formInfo } from "../../models/FormInfoSchema.js";
import { AuthStructure } from "../../models/AuthSchema.js";
// import { AuthDB } from "../../config/DBconfig.js";
// import mongoose, { model } from "mongoose";
export const liveFormRouter = express.Router();
// const USERDB = EnvironmentVariables.userDB
// import { UserDB } from "../../config/DBconfig.js";
import { formMetadata } from "../../models/formMetadataSchema.js";
import { formResponse } from "../../models/formResponseSchema.js";
//url generator
const urlGenerator = (userName, id) => {
    let obj = JSON.stringify({ user: userName, id: id });
    const encryptedUrl = CryptoJS.AES.encrypt(obj, EnvironmentVariables.encryptedSecretKey).toString();
    // as '/' violates the url logic of us and give error
    const urlSafeEncryptedUrl = encryptedUrl
        .replace(/\+/g, '-')    // Replace + with -
        .replace(/\//g, '_')
    console.log("URLENCRYPTED URL", urlSafeEncryptedUrl)
    return urlSafeEncryptedUrl;

}
//extract data from token
const extractDataFromToken = (jwtToken) => {
    const data = jwt.verify(jwtToken, EnvironmentVariables.jwtScretKey)
    return data.user
}
const cookieCheckingMiddleware = (req, res, next) => {
    console.log("This is a middlware")
    if (!req.cookies?.jwt) {
        console.log("errror occurred")
        return res.status(401).json({
            error: "jwt",
            success: false,
            message: "user has not login yet..."
        })
    }
    if (req.cookies.jwt) {
        const userId = extractDataFromToken(req.cookies.jwt)
        req.userInfo = {
            userId: userId
        }
    }
    next();
}

// const getFormList = async (req, res) => {
//     try {
//         const user = extractDataFromToken(req.cookies?.jwt)
//         console.log("Registered User", user)
//         //bydefault colname is set  by name of modelname if it not given
//         let result = UserDB.model(user, formInfo, user)
//         let collectList = await result.find({}, { name: 1, _id: 0, timeStamp: 1 }).sort({ createdAt: -1 }) //for descending
//         //getting user  used storage size 
//         console.log("Result:", collectList)
//         // if (collectList.length > 0) {
//         //     collectList = collectList.map(x => x.name)
//         // }
//         res.status(200).json({
//             data: {
//                 name: user,
//                 formlist: collectList,
//             },
//             success: true,
//             message: "successfull...."
//         })
//     }
//     catch (e) {
//         res.status(404).json({
//             data: null,
//             success: false,
//             message: e.message
//         })
//     }
// }
// const uploadForm = async (req, res) => {

//     try {
//         if (!req.body || !(Object.keys(req.body).length)) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Bad request"
//             })
//         }
//         const user = extractDataFromToken(req.cookies?.jwt)
//         const url = urlGenerator(user, req.body.formId);
//         //mongo operation
//         //creating collection name same as the user
//         const col = UserDB.model(user, formInfo, user)
//         console.log(col)
//         const result2 = await col.create({
//             _id: url,
//             name: req.body.formId,
//             fields: req.body.fieldDetails,
//             title: req.body.title,
//             description: req.body.description,
//             timeStamp: new Date().toDateString(),
//             response: 0
//         })
//         console.log("FILE SAVED...", result2)
//         //after mongo operation
//         res.status(200).json({
//             data: { url: url },
//             success: true,
//             message: "form upload is successfull...."
//         })
//     }
//     catch (e) {
//         res.status(404).json({
//             data: null,
//             success: false,
//             message: e.message
//         })
//     }
// }
// const getSpecificFormDetails = async (req, res) => {
//     try {
//         const user = extractDataFromToken(req.cookies?.jwt);
//         //method2
//         console.log("USER FORMID", req.params.formName)
//         let rDBModel = UserDB.model(user, formInfo, user)
//         let result2 = await rDBModel.findOne(
//             { name: req.params.formName }, { _id: 1, title: 1, description: 1, timeStamp: 1, response: 1, name: 1 }
//         )

//         //_doc field contain acutal info
//         console.log("FormDetails", result2._doc)
//         return res.status(200).json({
//             // data: { ...result2, link: result2._id, },
//             data: { ...result2._doc, link: result2._doc._id, },
//             success: true,
//             message: "successfull...."
//         })

//     }
//     catch (e) {
//         res.status(500).json({
//             success: false,
//             message: e.message
//         })
//     }
// }
// const removeSpecificForm = async (req, res) => {
//     try {
//         const user = extractDataFromToken(req.cookies?.jwt)
//         let rDBModela = UserDB.model(user, formInfo, user)
//         console.log(req.params.formName, rDBModela)
//         // Returns the deleted document.
//         // Deletes the document in a single operation
//         let result = await rDBModela.findOneAndDelete({ name: req.params.formName })
//         console.log("Remove daata", result, req.params.formName)
//         if (!result) {
//             return res.status(500).json({
//                 success: false,
//                 message: "something went wrong try again later"
//             })
//         }
//         //deleting data on cloud when responses is there
//         if (result.response) {
//             deletingBlob(user, req.params.formName)
//                 .then(() => {
//                     console.log("successfull deleted")
//                     res.status(200).json({
//                         success: true,
//                         message: "successfully deleted form"
//                     })
//                 })
//                 .catch((err) => {
//                     console.error(err)
//                     res.status(500).json({
//                         success: false,
//                         message: "something went wrong try again later"
//                     })
//                 })
//         }
//         console.log("successfull deleted")
//         res.status(200).json({
//             success: true,
//             message: "successfully deleted form"
//         })
//         console.log("Result:", result)
//     }
//     catch (e) {
//         res.status(404).json({
//             success: false,
//             message: e.message
//         })
//     }

// }
const getUserDetails = async (req, res) => {
    try {
        // const userId = extractDataFromToken(req.cookies?.jwt)
        const userId = req.userInfo.userId
        console.log("this is user Id", userId)
        let result = AuthStructure
        let userDetails = await result.findOne({ _id: userId }, { username: 1, email: 1 })

        if (!userDetails) {
            return res.status(401).json({
                data: null,
                success: false,
                message: "User not found"
            })
        }
        //getting user  used storage size 
        console.log("ds", userDetails)
        let result2 = formMetadata

        let formsInfo = await result2.find({ user_id: userId }, { name: 1, _id: 0, storage: 1 })


        let formList = []
        if (formsInfo.length > 0) {
            formList = formsInfo.map(x => x.name)
        }
        console.log("Result:", userDetails, formList)

        //getting data here
        let totalFormStorage = formsInfo.reduce((x, y) => x + y.storage, 0)
        console.log("storageSize:", totalFormStorage)
        res.status(200).json({
            data: {
                email: userDetails.email,
                name: userDetails.username,
                formlist: formList,
                storageInBytes: totalFormStorage,
            },
            success: true,
            message: "successfull...."
        })
    }
    catch (e) {
        res.status(404).json({
            data: null,
            success: false,
            message: e.message
        })
    }
}
liveFormRouter.use(cookieCheckingMiddleware)
// //form upload of user
// liveFormRouter.post("/upload", uploadForm)
// //list
// liveFormRouter.get('/formlist', getFormList)
// //formDelete
// liveFormRouter.delete("/delete/:formName", removeSpecificForm)
// //formDetails
// liveFormRouter.get("/formDetails/:formName", getSpecificFormDetails)

// liveFormRouter.get("/details", getUserDetails)

const uploadForm1 = async (req, res) => {
    try {
        if (!req.body || !(Object.keys(req.body).length)) {
            return res.status(400).json({
                success: false,
                message: "Bad request"
            })
        }
        const userId = req.userInfo.userId
        const url = urlGenerator(userId, req.body.formId);
        // console.log(user)
        const col2 = AuthStructure
        const userInfo = await col2.findOne({ _id: userId }, { _id: 1 })
        //mongo operation
        //creating collection name same as the user

        const col = formMetadata
        console.log(userInfo)
        const result2 = await col.create({
            name: req.body.formId,
            fields: req.body.fieldDetails,
            title: req.body.title,
            description: req.body.description,
            user_id: userId,  //_id of usrInfo or (saved in jwt) is the user_id in forms
            response: 0,
            url: url
        })
        console.log("FILE SAVED...", result2)
        //after mongo operation
        res.status(200).json({
            data: { url: url },
            success: true,
            message: "form upload is successfull...."
        })
    }
    catch (e) {
        res.status(404).json({
            data: null,
            success: false,
            message: e.message
        })
    }
}

const getFormList1 = async (req, res) => {
    try {
        const userId = req.userInfo.userId
        console.log("Registered User", userId)
        //bydefault colname is set  by name of modelname if it not given
        // let autcol = AuthStructure
        // let userInfo = await autcol.findOne({ username: user }, { _id: 1 })
        let result = formMetadata
        let collectList = await result.find({ user_id: userId }, { name: 1, _id: 0, createdAt: 1 }).sort({ createdAt: -1 }) //for descending
        //getting user  used storage size 
        console.log("Result:", collectList)
        res.status(200).json({
            data: {
                formlist: collectList,
            },
            success: true,
            message: "successfull...."
        })
    }
    catch (e) {
        res.status(404).json({
            data: null,
            success: false,
            message: e.message
        })
    }
}

const getSpecificFormDetails1 = async (req, res) => {
    try {
        const userId = req.userInfo.userId

        // let autcol = AuthStructure
        // let userInfo = await autcol.findOne({ username: user }, { _id: 1 })

        console.log("USER FORMID", req.params.formName)
        let rDBModel = formMetadata
        let result2 = await rDBModel.findOne(
            { user_id: userId, name: req.params.formName }, { url: 1, title: 1, description: 1, createdAt: 1, response: 1, name: 1 }
        )

        //_doc field contain acutal info
        console.log("FormDetails", result2)
        return res.status(200).json({
            // data: { ...result2, link: result2._id, },
            data: { ...result2._doc, timeStamp: result2.createdAt, link: result2.url },
            success: true,
            message: "successfull...."
        })

    }
    catch (e) {
        res.status(500).json({
            success: false,
            message: e.message
        })
    }
}

const removeSpecificForm1 = async (req, res) => {
    try {
        const userId = req.userInfo.userId



        // let autcol = AuthStructure
        // let userInfo = await autcol.findOne({ username: user }, { _id: 1 })

        let rDBModela = formMetadata
        console.log(req.params.formName, rDBModela)
        // Returns the deleted document.
        // Deletes the document in a single operation
        let result = await rDBModela.findOneAndDelete({ user_id: userId, name: req.params.formName })
        console.log("Remove daata", result, req.params.formName)
        if (!result) {
            return res.status(500).json({
                success: false,
                message: "something went wrong try again later"
            })
        }
        //deleting data on cloud when responses is there

        // let fileNameArray = responseDoc.map(x => x.file_metadata.originalname)
        if (result.response) {
            let responseDoc = await formResponse.deleteMany({ form_id: result._id });
            console.log(responseDoc)
            deletingBlob(result._id)
                .then(() => {
                    console.log("successfull deleted form ")
                    res.status(200).json({
                        success: true,
                        message: "successfully deleted form"
                    })
                })
                .catch((err) => {
                    console.error(err)
                    res.status(500).json({
                        success: false,
                        message: "something went wrong try again later"
                    })
                })
        }
    }
    catch (e) {
        res.status(404).json({
            success: false,
            message: e.message
        })
    }

}
liveFormRouter.get("/details", getUserDetails)
//formDelete
liveFormRouter.delete("/v1/delete/:formName", removeSpecificForm1)
liveFormRouter.get("/v1/formDetails/:formName", getSpecificFormDetails1)
liveFormRouter.post("/v1/upload", uploadForm1)
liveFormRouter.get("/v1/formlist", getFormList1)
liveFormRouter.get("/v1/response/:formName", async (req, res) => {
    try {
        const userId = req.userInfo.userId

        console.log("USER FORMID", req.params.formName)
        let rDBModel = formMetadata
        let result2 = await rDBModel.findOne(
            { user_id: userId, name: req.params.formName }, { _id: 1, fields: 1 }
        )
        let colname = result2.fields.map(x => x.Name)
        let formResponses = await formResponse.find({ form_id: result2._id }, { response_data: 1, "file_metadata": 1 })
        console.log(formResponses);
        //_doc field contain acutal info
        console.log("FormDetails", result2)
        return res.status(200).json({
            data: { responses: formResponses, fields: colname },
            success: true,
            message: "successfull...."
        })

    }
    catch (e) {
        res.status(500).json({
            success: false,
            message: e.message
        })
    }
})