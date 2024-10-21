const http = require('http');

http.createServer((request, response) => {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('Hello Node!\n');
}).listen(8080);

console.log('My first Node test server is running on Port 8080.');

///

const http = require('http');
const fs = require('fs');
const url = require('url');


http.createServer((request, response) => {
  let addr = request.url,  
      q = new URL(addr, 'http://' + request.headers.host),  // Parse the URL
      filePath = '';  

  // Log the URL and timestamp to log.txt
  fs.appendFile('log.txt', `URL: ${addr}\nTimestamp: ${new Date()}\n\n`, (err) => {
    if (err) {
      console.log('Error logging request:', err);
    } else {
      console.log('Request logged.');
    }
  });

  // Set the file path based on the URL path
  if (q.pathname.includes('documentation')) {
    filePath = __dirname + '/documentation.html';
  } else {
    filePath = 'index.html';
  }

  // Read and serve the requested file
  fs.readFile(filePath, (err, data) => {
    if (err) {
      response.writeHead(404, { 'Content-Type': 'text/html' });
      response.end('<h1>404 Not Found</h1>');
    } else {
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end(data);
    }
  });

}).listen(8080);

console.log('Server running on http://localhost:8080');
