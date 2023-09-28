const { BlobServiceClient, StorageSharedKeyCredential } = require("@azure/storage-blob");

// Azure Blob Storage configuration
const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const containerName = "csvfiles"; // Replace with your container name
const blobName = "ISIN-Upload"; // Provide the correct blob path
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

document.addEventListener("DOMContentLoaded", function () {
  const uploadButton = document.getElementById("uploadButton");
  const fileInput = document.getElementById("fileInput");
  const feedbackContainer = document.getElementById("feedbackContainer");
  const feedbackText = document.getElementById("feedbackText");

  uploadButton.addEventListener("click", function () {
    // Check if a file is selected
    if (fileInput.files.length === 0) {
      alert("Please select a file to upload.");
      return;
    }

    // Show loading feedback
    feedbackContainer.style.display = "block";
    feedbackText.textContent = "Uploading...";

    // You can handle the file upload here
    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    fetch("/upload-endpoint", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          // Show success feedback
          feedbackText.textContent = "File uploaded successfully!";
        } else {
          // Show error feedback with error information
          feedbackText.textContent = "File upload failed. Please try again.";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        // Show error feedback with error information
        feedbackText.textContent = "File upload failed. Please try again.";
      });
  });
});

// Usage example
uploadISINsToAzureBlobStorage()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });
