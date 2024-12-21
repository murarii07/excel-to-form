import { BlobServiceClient } from "@azure/storage-blob";
import { config } from "dotenv";
config()
const connectionString=process.env.CONNECTION_STRING

const blobClient=BlobServiceClient.fromConnectionString(connectionString);
async function main() {
    const containerName = "my-container";
    const blobName = "sample.txt";
    const content = "This is a sample file";
  
    const containerClient =blobClient.getContainerClient(containerName);
    await containerClient.createIfNotExists();
  
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.upload(content, content.length);
  
    console.log(`Blob '${blobName}' uploaded.`);
  
    console.log("Listing blobs:");
    for await (const blob of containerClient.listBlobsFlat()) {
      console.log(blob.name);
    }
  }
  
  main().catch(console.error);

  async function mains() {
    const containerName = "my-container";
    const blobName = "sample.txt";
    const content = "This new added";
  
    const containerClient =blobClient.getContainerClient(containerName);
    await containerClient.createIfNotExists();
  
    const blockBlobClient = containerClient.getAppendBlobClient(blobName);
    await blockBlobClient.create()
    await blockBlobClient.appendBlock(content,content.length)
  
    console.log(`Blob '${blobName}' uploaded.`);
  
    console.log("Listing blobs:");
    for await (const blob of containerClient.listBlobsFlat()) {
      console.log(blob.name);
    }
  }
  
  mains().catch(console.error);