import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import url from "node:url";

const PORT = 8080;
const hostName = "localhost";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer(async(req, res) => {
  let filePath;
  if (req.url === "/" || req.url ==="/index" || req.url ==="/index.html" && req.method === "GET") {
    filePath = path.join(__dirname, "public", "index.html");
  } else {
    filePath = path.join(__dirname, "public", "error.html");
  }

  const data = await fs.readFile(filePath);
  res.setHeader("Content-Type", "text/html");
  res.write(data);
  res.end();
})

server.listen(PORT, hostName, () => {
  console.log(`Server is running at: http://${hostName}:${PORT}`);
})