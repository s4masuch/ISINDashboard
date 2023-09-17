const express = require('express');
const http = require('http');
const path = require('path');
const multer = require('multer');
const { BlobServiceClient, StorageSharedKeyCredential } = require('@azure/storage-blob');

const app = express();
const server = http.createServer(app);

const hostname = '0.0.0.0'; // Listen on all available network interfaces
const port = process.env.PORT || 8080; // Use the PORT environment variable or default to 8080

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Configure Azure Blob Storage
const storageAccountName = 'your-azure-storage-account-name'
const connectionString = 'your-azure-storage-connection-string';
const containerName = 'your-container-name';
const sharedKeyCredential = new StorageSharedKeyCredential(storageAccountName,connectionString);
const blobServiceClient = new BlobServiceClient(connectionString);

// Set up a multer storage engine for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Handle POST requests to the /upload-endpoint route
app.post('/upload-endpoint', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const blobName = req.file.originalname; // Use the original filename as the blob name
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  try {
    // Upload the file to Azure Blob Storage
    await blockBlobClient.uploadData(req.file.buffer, req.file.buffer.length);

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
