import express from "express";
import { MongoClient } from "mongodb";
export const liveFormRouter = express.Router();
const mongoUrl = "mongodb://localhost:27017"
const client = new MongoClient(mongoUrl);

liveFormRouter.post("/upload", async (req, res) => {
    //mongo operation
    await client.connect()
    //mongo operation
    const user = "tempData" //this will get through cookies
    let db=client.db(user);
    let col=db.collection(req.body.formId);
    let result=col.insertOne({_id:"0newly_uploaded",temp:"temperory purpose only"});

    //here the data will be saveds in mongodb and give form id

    //after mongo operation
    try {

        res.status(200).json({
            data:[{url:"url"}],
            success: true,
            message: "form upload is successfull...."
        })
    }
    catch (e) {
        res.status(404).json({
            data: null,
            success: false,
            message: "failure...."
        })
    }
})

//this  api hit when user want to edit the form after being uploaded
liveFormRouter.get("/:formId", async (req, res) => {
    try {
        await client.connect()
        //mongo operation
        const user = "tempData" //this will get through cookies
        let obj = []
        const databasesList = await client.db().admin().listDatabases();//returns object
        console.log(databasesList.databases.some(db=>db.name===user))

        //checking whether database is presented or not
        if (databasesList.databases.some(db=>db.name===user)) {
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