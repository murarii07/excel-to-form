import { BlobServiceClient } from "@azure/storage-blob";
import { EnvironmentVariables } from "../config/config.js";

const connectionString = EnvironmentVariables.blobStorageConnectionString;


//the container name should be in lowecase only ,it does not allow uppercase
const blobClient = BlobServiceClient.fromConnectionString(connectionString);
export default async function storingOnCloud(containername, blobname, data) {
  const containerName = containername.toLowerCase();
  const blobName = `${blobname}.json`;
  let content = data;

  //container 
  const containerClient = blobClient.getContainerClient(containerName);
  await containerClient.createIfNotExists();
  //blob
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  // console.log("createdddddddddddd")
  //if blob exists
  const r = await blockBlobClient.exists()
  if (r) {
    // console.log("ohhhh yes")
    const res = await blockBlobClient.download()
    const result = await streamToBuffer(res.readableStreamBody)
    const downloaded = result.toString();
    // console.log("Downloaded blob content:", downloaded);
    const obj = JSON.parse(data);
    const s = JSON.parse(downloaded)
    content = JSON.stringify([...obj, ...s]);
  }
  await blockBlobClient.upload(content, content.length);


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

export async function deletingBlob(containername) {
  const containerName = `form-${containername}`;
  const containerClient = blobClient.getContainerClient(containerName);
  const r = await containerClient.delete();
  console.log("DELETED successfullyy")
  // for await (const element of fileName) {
  //   const blobName = element;
  //   const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  //   await blockBlobClient.deleteIfExists();
  //   console.log("deleted")
  // }
}
export async function getBlobSize(containername) {
  const containerName = containername.toLowerCase();
  const containerClient = blobClient.getContainerClient(containerName);
  let size = 0
  for await (const blob of containerClient.listBlobsFlat()) {
    size += blob.properties.contentLength || 0
    console.log("Metadata", blob.properties)
  }
  return size
}


export async function storingFiles(formId, fileName, fileBuffer, fileMimeType) {
  const containerName = `form-${formId}`.toLowerCase();
  const containerClient = blobClient.getContainerClient(containerName);

  await containerClient.createIfNotExists();
  const blockBlobClient = containerClient.getBlockBlobClient(fileName);
  await blockBlobClient.uploadData(fileBuffer, {
    blobHTTPHeaders: { blobContentType: fileMimeType }
  })
  console.log(`File ${fileName} uploaded successfully to ${containerName}`);

  //generating sas token for usercan see the files
  const timeDuration = new Date();
  timeDuration.setMonth(timeDuration.getMonth() + 1)
  const fileUrl = blockBlobClient.generateSasUrl({
    permissions: "r", //givng read acces only
    expiresOn: timeDuration
  })
  return fileUrl; // Return file URL for reference

}


// SAS (Shared Access Signature) is a URI (Uniform Resource Identifier) used to grant limited access to resources in Azure Storage. A SAS token allows you to grant specific permissions to clients (users or applications) to access Azure Blob Storage, File Storage, Queue Storage, or Table Storage without exposing your account keys.