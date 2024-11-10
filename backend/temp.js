import { MongoClient } from "mongodb";
import { config } from "dotenv";
config()
// const client =new MongoClient(mongoUrl);


// const d=async ()=>{
//     await client.connect();
//     const databasesList = await client.db().admin().listDatabases()
//     console.log(databasesList.databases.some(d => d.name === "tempData"))
//     console.log(databasesList)
// }

// const c=[1,2,3,33,4]

// console.log(c)
// d();

// //created a closure;
// function dbClientInstanceCreation(f){
//     let instance=null
//     return ()=>{
//         if(!instance){
//             instance = new MongoClient(f);
//         }
//         console.log("db server get connected..")
//         return instance
//     }
// }
// export const dbClientInstance=dbClientInstanceCreation(process.env.MONGODB_URL)
