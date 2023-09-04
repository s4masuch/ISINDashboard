const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);

const hostname = '0.0.0.0'; // Listen on all available network interfaces
const port = process.env.PORT || 8080; // Use the PORT environment variable or default to 8080

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
