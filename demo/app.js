const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const server = http.createServer((req, res) => {
  if (req.url === "/download-image") {
    const filePath = path.join(__dirname, "attachment-issues-icon.png");
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        res.statusCode = 404;
        res.end("File not found");
        return;
      }
      res.setHeader("Content-Type", "image/png");
      res.setHeader("X-Hello", "Jill!");
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=attachment-issues-icon.png"
      );
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    });
  } else {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello, world!");
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
