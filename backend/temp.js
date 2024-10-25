import { MongoClient } from "mongodb";
const mongoUrl="mongodb://localhost:27017"
const client =new MongoClient(mongoUrl);


const d=async ()=>{
    await client.connect();
    const databasesList = await client.db().admin().listDatabases()
    console.log(databasesList.databases.some(d => d.name === "tempData"))
    console.log(databasesList)
}
// d();