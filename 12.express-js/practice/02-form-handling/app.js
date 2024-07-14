const http = require("http");
const path = require("path");

const { readFile, writeFile } = require("fs/promises");

const requestHandler = async (req, res) => {
  if (req.method === "GET" && req.url === "/signup") {
    try {
      const template = await readFile(
        path.join(__dirname, "/static/signup.html")
      );

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(template);
    } catch (err) {
      res.end("Error :(");
    }
  }

  if (req.method === "POST" && req.url === "/signup") {
    try {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk;
      });

      req.on("end", async () => {
        await writeFile(
          path.join(__dirname, "users.txt"),
          decodeURIComponent(body)
        );
      });

      res.writeHead(201, { "Content-Type": "text/plain" });
      res.end("Success");
    } catch (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Error!");
    }
  }
};

const server = http.createServer(requestHandler).listen(8000);

console.log("Step 2 Server running at http://localhost:8000");

module.exports = server;
