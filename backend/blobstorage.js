import { BlobServiceClient } from "@azure/storage-blob";
import { config } from "dotenv";
config()
const connectionString = process.env.CONNECTION_STRING

const blobClient = BlobServiceClient.fromConnectionString(connectionString);
export default async function storingOnCloud(containername, blobname, data) {
  const containerName = containername;
  const blobName = `${blobname}.json`;
  const content = data;

  //container 
  const containerClient = blobClient.getContainerClient(containerName);
  await containerClient.createIfNotExists();
  //blob
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  console.log("createdddddddddddd")
  //if blob exists
  const r = await blockBlobClient.exists()
  if (r) {
    console.log("ohhhh yes")
    const res = await blockBlobClient.download()
    const downloaded = (await streamToBuffer(res.readableStreamBody)).toString();
    console.log("Downloaded blob content:", downloaded);
    const obj = JSON.parse(data);
    const s = JSON.parse(downloaded)
    const arr = JSON.stringify([...obj, ...s]);
    console.log("\n---------\n", arr)
    console.log(s.length)
    await blockBlobClient.upload(arr, arr.length);
  } else {
    //if not it creates and upload
    await blockBlobClient.upload(content, content.length);
  }

  //consoling
  // console.log(`Blob '${blobName}' uploaded.`);
  // console.log("Listing blobs:");
  // for await (const blob of containerClient.listBlobsFlat()) {
  //   console.log(blob.name);
  // }
}
async function streamToBuffer(readableStream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    readableStream.on("data", (data) => {
      chunks.push(data instanceof Buffer ? data : Buffer.from(data));
    });
    readableStream.on("end", () => {
      resolve(Buffer.concat(chunks));
    });
    readableStream.on("error", reject);
  });
}

export async function deletingBlob(containername, blobname){
  const containerName = containername;
  const blobName = `${blobname}.json`;
  const containerClient = blobClient.getContainerClient(containerName);
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  await blockBlobClient.deleteIfExists();
  console.log("deleted")

}