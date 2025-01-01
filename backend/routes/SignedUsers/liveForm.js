import express from "express";
import { MongoClient } from "mongodb";
export const liveFormRouter = express.Router();
import CryptoJS from "crypto-js";
import { config } from "dotenv";
import jwt from 'jsonwebtoken'
import { DatabaseInstance } from "../../src/Module.js";
import { deletingBlob, getBlobSize } from "../../src/blobstorage.js";

config() //loading the env file
const client = new MongoClient(process.env.MONGODB_URL);
const USERDB = process.env.USERDB
//url generator
function urlGenerator(userName, id) {
    let obj = JSON.stringify({ user: userName, id: id });
    const encryptedUrl = CryptoJS.AES.encrypt(obj, process.env.ENCRYPTED_SECRET_KEY).toString();
    // as '/' violates the url logic of us and give error
    const urlSafeEncryptedUrl = encryptedUrl
        .replace(/\+/g, '-')    // Replace + with -
        .replace(/\//g, '_')
    console.log(urlSafeEncryptedUrl)
    return urlSafeEncryptedUrl;

}
//extract data from token
function extractDataFromToken(jwtToken) {
    const token = jwtToken
    const data = jwt.verify(token, process.env.JWT_SECRET_KEY)
    // this is use for testing purpose only
    // const data={user:"tempData"}
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
        console.log(user)
        // let collectList = await DatabaseInstance.collectionList(user)
        let collectList = await DatabaseInstance.retriveDataAll(USERDB, user, {}, { name: 1, _id: 0 })
        console.log(collectList)
        // const db = client.db(user)
        // const userDbDeatails = await db.stats() //give user db details by using db.stats which returns a promise 
        // console.log(userDbDeatails.storageSize)
        let storageSize=await getBlobSize(user)
        console.log("storageSize:",storageSize)
        collectList = collectList.map(x => x.name)
        res.status(200).json({
            data: {
                name: user,
                formlist: collectList,
                // storageInBytes: userDbDeatails.storageSize,
                storageInBytes:storageSize
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
        const user = extractDataFromToken(req.cookies?.jwt)
        //mongo operation
        const url = urlGenerator(user, req.body.formId);
        // const result = await DatabaseInstance.InsertData(user, req.body.formId, { _id: url, fields: req.body.fieldDetails, title: req.body.title, description: req.body.description })
        const result = await DatabaseInstance.InsertData(USERDB, user, {
            _id: url,
            name: req.body.formId,
            fields: req.body.fieldDetails,
            title: req.body.title,
            description: req.body.description,
            timeStamp: new Date().toDateString(),
            response: 0
        })
        console.log(result)
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
        // const user="murli"
        // let filterQuery = { name: req.params.formId }
        // let isCollectionExist = await DatabaseInstance.collectionList(user, filterQuery)
        // if (!isCollectionExist.length) {
        //     return res.status(500).json({
        //         success: false,
        //         message: "try again later"
        //     })
        // }
        // let result = await DatabaseInstance.retriveData(user, req.params.formId, {}, { projection: { _id: 1, title: 1, description: 1 } })
        console.log(req.params.formId)
        let result = await DatabaseInstance.retriveData(USERDB, user, { name: req.params.formId }, { projection: { _id: 1, title: 1, description: 1, timeStamp: 1 ,response:1,name:1} })
        console.log("FormDetails", result)
        return res.status(200).json({
            data: {...result,link: result._id,},
            success: true,
            message: "successfull...."
        })

    }
    catch (e) {
        res.status(404).json({
            success: false,
            message: e.message
        })
    }
}
const removeSpecificForm = async (req, res) => {
    try {
        const user = extractDataFromToken(req.cookies?.jwt)
        // const collectionFilter = { name: req.params.formId };
        // const result = await DatabaseInstance.removeCollection(user, req.params.formId, collectionFilter)
        const result = await DatabaseInstance.RemoveData(USERDB, user, { name: req.params.formId })

        //deleting data on cloud
        deletingBlob(user, req.params.formId)
            .then(() => console.log("successfull deleted"))
            .catch((err) => console.error(err))
        console.log("Result:", result)
        if (result) {
            res.status(200).json({
                success: true,
                message: "successfully deleted form"
            })
        }
        else {
            res.status(500).json({
                success: false,
                message: "something went wrong try again later"
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

liveFormRouter.use(cookieCheckingMiddleware)
//form upload of user
liveFormRouter.post("/upload", uploadForm)
//list
liveFormRouter.get('/formlist', getFormList)
//formDelete
liveFormRouter.delete("/delete/:formId", removeSpecificForm)
//formDetails
liveFormRouter.get("/formDetails/:formId", getSpecificFormDetails)



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
