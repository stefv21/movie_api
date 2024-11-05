const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 8080;

// Route to handle the root URL
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Route for documentation page
app.get('/documentation', (req, res) => {
  const filePath = path.join(__dirname, 'documentation.html');
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.status(404).send('<h1>404 Not Found</h1>');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    }
  });
});

// Log each request's URL and timestamp
app.use((req, res, next) => {
  const logMessage = `URL: ${req.url}\nTimestamp: ${new Date()}\n\n`;
  fs.appendFile('log.txt', logMessage, (err) => {
    if (err) console.log('Error logging request:', err);
  });
  next();
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
