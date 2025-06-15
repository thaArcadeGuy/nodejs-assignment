import http from "http";
import { getItems, getItem, createItem, updateItem, deleteItem } from "./controllers/controller.item.js";

const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
  if (req.url === "/api/items" && req.method === "GET") {
    getItems(req, res);
  } else if (req.url.match(/\/api\/items\/([a-zA-Z0-9\-]+)/) && req.method === "GET") {
    const id = req.url.split("/")[3];
    getItem(req, res, id);
  } else if (req.url === "/api/items" && req.method === "POST") {
    createItem(req, res);
  } else if(req.url.match(/\/api\/items\/([a-zA-Z0-9\-]+)/) && req.method === "PUT") {
    const id = req.url.split("/")[3];
    updateItem(req, res, id);
  } else if (req.url.match(/\/api\/items\/([a-zA-Z0-9\-]+)/) && req.method === "DELETE") {
    const id = req.url.split("/")[3];
    deleteItem(req, res, id)
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});