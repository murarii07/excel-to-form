import express from "express";
import { MongoClient } from "mongodb";
export const liveFormRouter = express.Router();
import CryptoJS from "crypto-js";
const mongoUrl = "mongodb://localhost:27017"
const client = new MongoClient(mongoUrl);


function urlGenerator(userName, id) {
    let obj = JSON.stringify({ user: userName, id: id });
    const encryptedUrl = CryptoJS.AES.encrypt(obj, 'secret key 123').toString();
    return encryptedUrl;
    
}


liveFormRouter.post("/upload", async (req, res) => {
    try {
        const token = req.cookies.jwt
        const data = jwt.verify(token, "mur@rii07")
        const user = data.user
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
        const user = "tempData" //this will get through cookies
        let obj = []
        const databasesList = await client.db().admin().listDatabases();//returns object
        console.log(databasesList.databases.some(db => db.name === user))

        //checking whether database is presented or not
        if (databasesList.databases.some(db => db.name === user)) {
            let formId = req.params.formId;
            let db = client.db(user); //user name
            let col = db.collection(formId);
            // .toArray() converts the cursor returned by find into an array of documents.
            obj = await col.find({}).toArray();
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
        const token = req.cookies.jwt
        const data = jwt.verify(token, "mur@rii07")
        const user = data.user
        let db = client.db(user);
        let collectList =await db.listCollections().toArray();
        console.log("ds",collectList)
        res.status(200).json({
            data: collectList,
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

liveFormRouter.delete("/delete/:formId",async (req,res)=>{
    try{
        // const token = req.cookies.jwt
        // const data = jwt.verify(token, "mur@rii07")
        // const user = data.user
        let user="tempData";
        let db = client.db(user);
        const collectionFilter = { name: req.params.formId }; 
        const result=await db.listCollections(collectionFilter).toArray()
        if(result.length){
            await db.dropCollection(req.params.formId)
            res.status(200).json({
                success:true,
                message:"successfully deleted form"
            })
        }
        else{
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