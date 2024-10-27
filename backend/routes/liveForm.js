import express from "express";
import { MongoClient } from "mongodb";
export const liveFormRouter = express.Router();
import CryptoJS from "crypto-js";
import { config } from "dotenv";
config() //loading the env file
const client = new MongoClient(process.env.MONGODB_URL);


//url generator
function urlGenerator(userName, id) {
    let obj = JSON.stringify({ user: userName, id: id });
    const encryptedUrl = CryptoJS.AES.encrypt(obj, process.env.ENCRYPTED_SECRET_KEY).toString();
    return encryptedUrl;

}
//extract data from token
function extractDataFromToken() {
    const token = req.cookies.jwt
    const data = jwt.verify(token, process.env.JWT_SECRET_KEY)
    return data.user
}

//form upload of user
liveFormRouter.post("/upload", async (req, res) => {
    try {
        const user = extractDataFromToken()
        //mongo operation
        await client.connect()
        let db = client.db(user);
        console.log(req.body)
        let col = db.collection(req.body.formId);
        const url = urlGenerator(user, req.body.formId);
        let result = await col.insertOne({ _id: url, fields: req.body.fieldName });
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
            message: "failure....."
        })
    }
})




//this  api hit when user want to edit the form after being uploaded
liveFormRouter.get("/edit/:formId", async (req, res) => {
    try {
        await client.connect()
        //mongo operation
        //const user = "tempData" //this will get through cookies
        const user = extractDataFromToken();
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
            message: "failure happend...."
        })
    }
})


liveFormRouter.get('/formlist', async (req, res) => {
    try {
        // const user = extractDataFromToken()
        const user="tempData"
        let db = client.db(user);
        let collectList = await db.listCollections().toArray();
        console.log(collectList)
        const userDbDeatails=await db.stats() //give user db details by using db.stats which returns a promise 
        console.log(userDbDeatails.storageSize)
        collectList=collectList.map(x=>x.name)
        res.status(200).json({
            data: {
                formlist:collectList,
                storageInBytes:userDbDeatails.storageSize
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
        const user = extractDataFromToken()
        // let user="tempData";
        let db = client.db(user);
        const collectionFilter = { name: req.params.formId };
        const result = await db.listCollections(collectionFilter).toArray()
        if (result.length) {
            await db.dropCollection(req.params.formId)
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
            message: e.message})
    }

})