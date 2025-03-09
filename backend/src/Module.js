// import { MongoClient } from "mongodb";

// import { EnvironmentVariables } from "../config/config.js";

// export class DatabaseInstance {
//     static client = new MongoClient(EnvironmentVariables.mongoDBUrl);
//     //class methods
//     static async retriveData(dbName, collectionName, query = {}, projector = { projection: {} }) {
//         await this.client.connect()
//         const db = this.client.db(dbName)
//         const col = db.collection(collectionName)
//         const result = await col.findOne(query, projector);
//         return result;
//         // if(dbName.readyState){

//         //     const result=await collectionName.findOne(query,projector);
//         //     return result;
//         // }
//     }
//     static async retriveDataAll(dbName, collectionName, query = {}, projector = {}) {
//         await this.client.connect()
//         const db = this.client.db(dbName)
//         const col = db.collection(collectionName)
//         const result = await col.find(query).project(projector).toArray();
//         return result;
//     }
//     static async InsertData(dbName, collectionName, query) {
//         await this.client.connect()
//         const db = this.client.db(dbName)
//         const col = db.collection(collectionName)
//         const result = await col.insertOne(query);
//         return result;
//     }
//     static async RemoveData(dbName, collectionName, query) {
//         await this.client.connect()
//         const db = this.client.db(dbName)
//         const col = db.collection(collectionName)
//         const result = await col.deleteOne(query);
//         return result.deletedCount;
//     }
//     static async UpdateData(dbName, collectionName, filterQuery, updateData) {
//         await this.client.connect()
//         const db = this.client.db(dbName)
//         const col = db.collection(collectionName)
//         const result = await col.updateOne(filterQuery, updateData);
//         return result;
//     }
//     // static async removeCollection(dbName,collectionName,query={}){
//     //     await this.client.connect()
//     //     const db= this.client.db(dbName)
//     //     const result =await db.listCollections(query).toArray();
//     //     if(result.length){
//     //         await db.dropCollection(collectionName)
//     //         return true;
//     //     }
//     //     return false;
//     // }

//     // static async collectionList(dbName,query={}){
//     //     await this.client.connect()
//     //     const db= this.client.db(dbName)
//     //     const result =await db.listCollections(query).toArray();
//     //     if(result.length){
//     //         return result;
//     //     }
//     //     return [];
//     // }

// }


// import cluster from "cluster";
// import os  from 'os'
// console.log(os.cpus().length)


// export class DatabaseInstance2{
//     static  client=new MongoClient(EnvironmentVariables.mongoDBUrl);
//     //class methods
//     static async retriveData(dbName,collectionName,query={},projector={projection:{}}){
//         // await this.client.connect()
//         // const db= this.client.db(dbName)
//         // const col=db.collection(collectionName)
//         if(dbName.readyState){
//             const result=await collectionName.findOne(query,projector);
//             return result;
//         }
//     }
//     static async retriveDataAll(dbName,collectionName,query={},projector={}){
//         await this.client.connect()
//         const db= this.client.db(dbName)
//         const col=db.collection(collectionName)
//         const result=await col.find(query).project(projector).toArray();
//         return result;
//     }
//     static async InsertData(dbName,collectionName,query){
//         await this.client.connect()
//         const db= this.client.db(dbName)
//         const col=db.collection(collectionName)
//         const result=await col.insertOne(query);
//         return result;
//     }
//     static async RemoveData(dbName,collectionName,query){
//         await this.client.connect()
//         const db= this.client.db(dbName)
//         const col=db.collection(collectionName)
//         const result=await col.deleteOne(query);
//         return result.deletedCount;
//     }
//     static async UpdateData(dbName,collectionName,filterQuery,updateData){
//         await this.client.connect()
//         const db= this.client.db(dbName)
//         const col=db.collection(collectionName)
//         const result=await col.updateOne(filterQuery,updateData);
//         return result;
//     }
//     // static async removeCollection(dbName,collectionName,query={}){
//     //     await this.client.connect()
//     //     const db= this.client.db(dbName)
//     //     const result =await db.listCollections(query).toArray();
//     //     if(result.length){
//     //         await db.dropCollection(collectionName)
//     //         return true;
//     //     }
//     //     return false;
//     // }

//     // static async collectionList(dbName,query={}){
//     //     await this.client.connect()
//     //     const db= this.client.db(dbName)
//     //     const result =await db.listCollections(query).toArray();
//     //     if(result.length){
//     //         return result;
//     //     }
//     //     return [];
//     // }

// }
// export class MongooseDb {
//     constructor(db, modelName, collectionName, userSchema) {
//         this.modelStructure = db.model(modelName, userSchema, collectionName)
//     }
//     async retriveData(query, projector={}) {
//         const r=await this.modelStructure.findOne(query, projector)
//         return r
//     }
//     async retriveDataAll(query, projector={}) {
//         const r=await this.modelStructure.find(query, projector)
//         return r
//     }
//     async insertData(query){
//         const r=await this.modelStructure.create(query)
//         return r
//     }
//     // async removeData(query){
//     //     const r=await this.modelStructure.(query, projector)
//     //     return r
//     // }
// }
// function main(naam){
//     this.name=naam
// }
// const d=new main()
// console.log(d)

import { randomBytes } from "crypto";
export class Formlist {
    formIdList = [];

    add(value) {
        this.formIdList.push(value)
    }
    remove(formId) {
        this.formIdList.splice(this.formIdList.indexOf(formId), 1);
    }
    findId(formId) {
        const isEx = this.formIdList.find(x => x === formId)
        return isEx
    }
    generateUniqueElement() {
        let formId = randomBytes(8).toString('hex')
        while (this.findId(formId)) {
            formId = randomBytes(8).toString('hex')
            return formId

        }
        return formId
    }
}

// console.log(randomBytes(16).toString("hex"))