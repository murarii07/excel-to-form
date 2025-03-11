import express from "express";
import CryptoJS from "crypto-js";
import jwt from 'jsonwebtoken'
// import { DatabaseInstance, MongooseDb } from "../../src/Module.js";
import { deletingBlob, getBlobSize } from "../../src/blobstorage.js";
import { EnvironmentVariables } from "../../config/config.js";
import { formInfo } from "../../models/FormInfoSchema.js";
import { structure } from "../../models/AuthSchema.js";
import { AuthDB } from "../../config/DBconfig.js";
// import mongoose, { model } from "mongoose";
export const liveFormRouter = express.Router();
// const USERDB = EnvironmentVariables.userDB
import { UserDB } from "../../config/DBconfig.js";
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
        return res.status(400).json({
            error: "jwt",
            success: false,
            message: "user has not login yet..."
        })
    }
    next();
}
const getFormList = async (req, res) => {
    try {
        const user = extractDataFromToken(req.cookies?.jwt)
        console.log("Registered User", user)
        //bydefault colname is set  by name of modelname if it not given
        let result = UserDB.model(user, formInfo, user)
        let collectList = await result.find({}, { name: 1, _id: 0,timeStamp:1 }).sort({createdAt:-1}) //for descending
        //getting user  used storage size 
        console.log("Result:", collectList)
        // if (collectList.length > 0) {
        //     collectList = collectList.map(x => x.name)
        // }
        res.status(200).json({
            data: {
                name: user,
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
const uploadForm = async (req, res) => {

    try {
        if (!req.body || !(Object.keys(req.body).length)) {
            return res.status(400).json({
                success: false,
                message: "Bad request"
            })
        }
        const user = extractDataFromToken(req.cookies?.jwt)
        const url = urlGenerator(user, req.body.formId);
        //mongo operation
        //creating collection name same as the user
        const col = UserDB.model(user, formInfo)
        const result2 = await col.create({
            _id: url,
            name: req.body.formId,
            fields: req.body.fieldDetails,
            title: req.body.title,
            description: req.body.description,
            timeStamp: new Date().toDateString(),
            response: 0
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
const getSpecificFormDetails = async (req, res) => {
    try {
        const user = extractDataFromToken(req.cookies?.jwt);
        //method2
        console.log("USER FORMID", req.params.formName)
        let rDBModel = UserDB.model(user, formInfo, user)
        let result2 = await rDBModel.findOne(
            { name: req.params.formName }, { _id: 1, title: 1, description: 1, timeStamp: 1, response: 1, name: 1 }
        )

        //_doc field contain acutal info
        console.log("FormDetails", result2._doc)
        return res.status(200).json({
            // data: { ...result2, link: result2._id, },
            data: { ...result2._doc, link: result2._doc._id, },
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
const removeSpecificForm = async (req, res) => {
    try {
        const user = extractDataFromToken(req.cookies?.jwt)
        let rDBModela = UserDB.model(user, formInfo)
        console.log(req.params.formName, rDBModela)
        // Returns the deleted document.
        // Deletes the document in a single operation
        let result = await rDBModela.findOneAndDelete({ name: req.params.formName })
        // let result = await rDBModela.deleteOne({ name: req.params.formName })
        // if (!result.deletedCount) {
        //     return res.status(500).json({
        //         success: false,
        //         message: "something went wrong try again later"
        //     })
        // }
        console.log("Remove daata", result, req.params.formName)
        if (!result) {
            return res.status(500).json({
                success: false,
                message: "something went wrong try again later"
            })
        }
        //deleting data on cloud when responses is there
        if (result.response) {
            deletingBlob(user, req.params.formName)
                .then(() => {
                    console.log("successfull deleted")
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
        console.log("successfull deleted")
        res.status(200).json({
            success: true,
            message: "successfully deleted form"
        })
        console.log("Result:", result)
    }
    catch (e) {
        res.status(404).json({
            success: false,
            message: e.message
        })
    }

}
const getUserDetails = async (req, res) => {
    try {
        const user = extractDataFromToken(req.cookies?.jwt)
        let result = AuthDB.model("authstructures", structure)
        let userDetails = await result.findOne({ username: user }, { _id: 0, email: 1 })
        //getting user  used storage size 
        let result2 = UserDB.model(user, formInfo, user)
        let collectionList = await result2.find({}, { name: 1, _id: 0 })
        if (collectionList.length > 0) {
            collectionList = collectionList.map(x => x.name)
        }
        console.log("Result:", userDetails, collectionList)
        let storageSize = 0
        try {
            storageSize = await getBlobSize(user)
        } catch (e) {
            console.log("Storage size error", e.message)
        }

        console.log("storageSize:", storageSize, userDetails)
        res.status(200).json({
            data: {
                email: userDetails.email,
                name: user,
                formlist: collectionList,
                storageInBytes: storageSize,
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
//form upload of user
liveFormRouter.post("/upload", uploadForm)
//list
liveFormRouter.get('/formlist', getFormList)
//formDelete
liveFormRouter.delete("/delete/:formName", removeSpecificForm)
//formDetails
liveFormRouter.get("/formDetails/:formName", getSpecificFormDetails)

liveFormRouter.get("/details", getUserDetails)

// //this is optional
// //this  api hit when user want to edit the form after being uploaded
// liveFormRouter.get("/edit/:formId", async (req, res) => {
//     try {
//         await client.connect()
//         //mongo operation
//         const user = extractDataFromToken(req.cookies?.jwt);
//         const databasesList = await client.db().admin().listDatabases();//returns object
//         console.log(databasesList.databases.some(db => db.name === user))

//         //checking whether database is presented or not
//         if (databasesList.databases.some(db => db.name === user)) {
//             let formId = req.params.formId;
//             let db = client.db(user); //user name
//             let col = db.collection(formId);
//             // .toArray() converts the cursor returned by find into an array of documents.
//             let obj = await col.find({}).toArray();
//             console.log(obj)
//         }
//         //here the data will be taken out  from  mongodb using form Id

//         res.status(200).json({
//             data: obj,
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
// })
