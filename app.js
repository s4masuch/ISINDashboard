const http = require('http');

const hostname = '0.0.0.0'; // Listen on all available network interfaces
const port = process.env.PORT || 8080; // Use the PORT environment variable or default to 8080

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
