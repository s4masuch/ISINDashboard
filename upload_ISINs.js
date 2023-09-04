const { BlobServiceClient, StorageSharedKeyCredential } = require('@azure/storage-blob');
const fs = require('fs');

// Azure Blob Storage configuration
const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME;
const blobName = "ISIN-Upload/myfile.txt"; // Provide the correct blob path
const fileContent = "Your file content goes here"; // Provide your file content

async function uploadISINsToAzureBlobStorage() {
  if (!connectionString) {
    return Promise.reject("Error: Azure Storage connection string not provided");
  }

  const sharedKeyCredential = StorageSharedKeyCredential.fromConnectionString(connectionString);
  const blobServiceClient = new BlobServiceClient(connectionString);

  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  const uploadResponse = await blockBlobClient.upload(fileContent, fileContent.length);

  if (uploadResponse._response.status === 201) {
    return "File uploaded to Azure Blob Storage successfully";
  } else {
    return `Error uploading file to Azure Blob Storage: ${uploadResponse._response.status} - ${uploadResponse.reasonPhrase}`;
  }
}

// Usage example
uploadISINsToAzureBlobStorage()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });
