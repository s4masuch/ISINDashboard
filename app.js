// Debug log
console.log("app.js is called");

const express = require('express');
const http = require('http');
const path = require('path');
const multer = require('multer');
const react = require('react');
const cors = require('cors');
const { BlobServiceClient, BlockBlobClient, StorageSharedKeyCredential } = require('@azure/storage-blob');
const { AzureCliCredential, ManagedIdentityCredential } = require('@azure/identity');

const app = express();
const server = http.createServer(app);

const hostname = '0.0.0.0'; // Listen on all available network interfaces
const port = process.env.PORT || 8080; // Use the PORT environment variable or default to 8080

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));


// Acquire a credential object (try ManagedCredential, if not take AzureCliCredential)
const managedIdentityCredential = new ManagedIdentityCredential();

if (managedIdentityCredential.isAvailable) {
  // The ManagedIdentityCredential is working.
  tokenCredential = new ManagedIdentityCredential();
} else {
  // The ManagedIdentityCredential is not working.
  tokenCredential = new AzureCliCredential();
}

// Configure Azure Blob Storage
const storageAccountName = process.env.AZURESTORAGEACCOUNTNAME || 'csb10032002e776c96f';
const connectionString = process.env.AZURECONNECTIONSTRING || 'https://csb10032002e776c96f.blob.core.windows.net';
const containerName = 'csvfiles';
const blobServiceClient = new BlobServiceClient(connectionString, tokenCredential);
const accountName = blobServiceClient.accountName;
if (!accountName) throw Error('Azure Storage accountName not found');

// Set up a multer storage engine for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Use cors to enable cross-domain endpoints
app.use("/upload-endpoint", cors());
// Handle POST requests to the /upload-endpoint route
app.post('/upload-endpoint', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
    
    const blobName = req.file.originalname; // Use the original filename as the blob name
    const blockBlobClient = new BlockBlobClient(`${connectionString}/${containerName}/${blobName}`, tokenCredential)

  try {
    // Upload the file to Azure Blob Storage
    await blockBlobClient.uploadData(req.file.buffer);

    res.status(200).send('File uploaded successfully.');
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).send('File upload failed. Please try again.');
  }
});

// Serve the main 'index.html' file when accessing the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the HTTP server
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
