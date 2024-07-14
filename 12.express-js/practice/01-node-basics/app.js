const http = require("http");
const path = require("path");

const { readFile } = require("fs/promises");

const requestHandler = async (req, res) => {
  try {
    if (req.url === "/" && req.method === "GET") {
      const htmlPath = await readFile(
        path.join(__dirname, "/static/index.html")
      );

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(htmlPath);
    } else if (req.url === "/static/styles.css" && req.method === "GET") {
      const cssPath = await readFile(path.join(__dirname, "static/style.css"));

      res.writeHead(200, { "Content-Type": "text/css" });
      res.end(cssPath);
    } else if (req.url === "/static/app.js" && req.method === "GET") {
      const javaScriptPath = await readFile(
        path.join(__dirname, "static/app.js")
      );

      res.writeHead(200, { "Content-Type": "text/javascript" });
      res.end(javaScriptPath);
    } else {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Hello World");
    }
  } catch (err) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Error!");
  }
};

const server = http.createServer(requestHandler).listen(8080);

module.exports = server;
