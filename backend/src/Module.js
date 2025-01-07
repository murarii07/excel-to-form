import { MongoClient } from "mongodb";
import { randomBytes } from "crypto";
import { EnvironmentVariables } from "../config/config.js";

export class DatabaseInstance{
    static  client=new MongoClient(EnvironmentVariables.mongoDBUrl);
    //class methods
    static async retriveData(dbName,collectionName,query={},projector={projection:{}}){
        await this.client.connect()
        const db= this.client.db(dbName)
        const col=db.collection(collectionName)
        const result=await col.findOne(query,projector);
        return result;
    }
    static async retriveDataAll(dbName,collectionName,query={},projector={}){
        await this.client.connect()
        const db= this.client.db(dbName)
        const col=db.collection(collectionName)
        const result=await col.find(query).project(projector).toArray();
        return result;
    }
    static async InsertData(dbName,collectionName,query){
        await this.client.connect()
        const db= this.client.db(dbName)
        const col=db.collection(collectionName)
        const result=await col.insertOne(query);
        return result;
    }
    static async RemoveData(dbName,collectionName,query){
        await this.client.connect()
        const db= this.client.db(dbName)
        const col=db.collection(collectionName)
        const result=await col.deleteOne(query);
        return result.deletedCount;
    }
    static async UpdateData(dbName,collectionName,filterQuery,updateData){
        await this.client.connect()
        const db= this.client.db(dbName)
        const col=db.collection(collectionName)
        const result=await col.updateOne(filterQuery,updateData);
        return result;
    }
    // static async removeCollection(dbName,collectionName,query={}){
    //     await this.client.connect()
    //     const db= this.client.db(dbName)
    //     const result =await db.listCollections(query).toArray();
    //     if(result.length){
    //         await db.dropCollection(collectionName)
    //         return true;
    //     }
    //     return false;
    // }

    // static async collectionList(dbName,query={}){
    //     await this.client.connect()
    //     const db= this.client.db(dbName)
    //     const result =await db.listCollections(query).toArray();
    //     if(result.length){
    //         return result;
    //     }
    //     return [];
    // }

}

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
// import cluster from "cluster";
// import os  from 'os'
// console.log(os.cpus().length)