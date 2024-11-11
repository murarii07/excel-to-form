import express from "express";
import { MongoClient } from "mongodb";
export const liveFormRouter = express.Router();
import CryptoJS from "crypto-js";
import { config } from "dotenv";
import jwt from 'jsonwebtoken'
import { DatabaseInstance } from "../temp.js";
config() //loading the env file
const client = new MongoClient(process.env.MONGODB_URL);
liveFormRouter.use(cookieCheckingMiddleware)
function cookieCheckingMiddleware(req, res, next) {
    console.log("middlware")
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
function extractDataFromToken(req) {
    const token = req.cookies?.jwt
    const data = jwt.verify(token, process.env.JWT_SECRET_KEY)
    // this is use for testing purpose only
    // const data={user:"tempData"}
    return data.user
}



//form upload of user
liveFormRouter.post("/upload", async (req, res) => {

    try {
        const user = extractDataFromToken(req)
        //mongo operation
        const url = urlGenerator(user, req.body.formId);
        const result = await DatabaseInstance.InsertData(user, req.body.formId, { _id: url, fields: req.body.fieldDetails, title: req.body.title, description: req.body.description })
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
})




//this  api hit when user want to edit the form after being uploaded
liveFormRouter.get("/edit/:formId", async (req, res) => {
    try {
        await client.connect()
        //mongo operation
        const user = extractDataFromToken(req);
        const databasesList = await client.db().admin().listDatabases();//returns object
        console.log(databasesList.databases.some(db => db.name === user))

        //checking whether database is presented or not
        if (databasesList.databases.some(db => db.name === user)) {
            let formId = req.params.formId;
            let db = client.db(user); //user name
            let col = db.collection(formId);
            // .toArray() converts the cursor returned by find into an array of documents.
            let obj = await col.find({}).toArray();
            console.log(obj)
        }
        //here the data will be taken out  from  mongodb using form Id

        res.status(200).json({
            data: obj,
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
})


liveFormRouter.get('/formlist', async (req, res) => {
    try {
        const user = extractDataFromToken(req)
        console.log(user)
        let collectList = await DatabaseInstance.collectionList(user)
        console.log(collectList)
        const db = client.db(user)
        const userDbDeatails = await db.stats() //give user db details by using db.stats which returns a promise 
        console.log(userDbDeatails.storageSize)
        console.log("ASdsad")
        collectList = collectList.map(x => x.name)
        res.status(200).json({
            data: {
                name: user,
                formlist: collectList,
                storageInBytes: userDbDeatails.storageSize
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
})

liveFormRouter.delete("/delete/:formId", async (req, res) => {
    try {
        const user = extractDataFromToken(req)
        const collectionFilter = { name: req.params.formId };
        const result = await DatabaseInstance.removeCollection(user, req.params.formId, collectionFilter)
        console.log("111111", result)
        if (result) {
            res.status(200).json({
                success: true,
                message: "successfully deleted form"
            })
        }
        else {
            throw new Error("Form is not available");
        }
    }
    catch (e) {
        res.status(404).json({
            success: false,
            message: e.message
        })
    }

})
liveFormRouter.get("/formDetails/:formId", async (req, res) => {
    try {
        const user = extractDataFromToken(req);
        // const user="murli"
        let filterQuery = { name: req.params.formId }
        let isCollectionExist = await DatabaseInstance.collectionList(user, filterQuery)
        if (!isCollectionExist.length) {
            return res.status(500).json({
                success: false,
                message: "try again later"
            })
        }
        let result = await DatabaseInstance.retriveData(user, req.params.formId, {}, { projection: { _id: 1, title: 1, description: 1 } })
        console.log("ssdsdsd", result)
        return res.status(200).json({
            data: {
                name: req.params.formId,
                description: result.description || "kuch nhi hai",
                link: result._id
            },
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
})