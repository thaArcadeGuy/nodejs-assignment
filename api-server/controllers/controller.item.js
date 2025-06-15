import * as Item from "../models/model.item.js";
import { getPostData } from "../utils.js";

// Get all items
// GET /api/items
async function getItems(req, res) {
  try {
    const items = await Item.findAll();
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(JSON.stringify(items));
  } catch (error) {
    console.log(error);
  }
};

// Get a single item
// GET /api/items/:id
async function getItem(req, res, id) {
  try {
    const item = await Item.findById(id);
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(JSON.stringify(item));
  } catch (error) {
    console.log(error);
  }
};

// Create a new item
// POST /api/items
async function createItem(req, res) {
  try {
    const body = await getPostData(req);

    const { name, price, size } = JSON.parse(body);

    const item = {
      name,
      price,
      size
    }

    const newItem = await Item.create(item);

    res.writeHead(201, {"Content-Type": "application/json"});
    return res.end(JSON.stringify(newItem));

  } catch (error) {
    console.log(error);
  }
}

// Update an item
// PUT /api/items/:id
async function updateItem(req, res, id) {
  try {
    const item = await Item.findById(id);

    if (!item) {
      res.writeHead(404, {"Content-Type": "application/json"});
      res.end(JSON.stringify({ message: "Item not found" }));
    } else {
      const body = await getPostData(req);

      const { name, price, size } = JSON.parse(body);

      const itemData = {
        name: name || item.name,
        price: price || item.price,
        size: size || item.size
      }

      const updatedItem = await Item.update(id, itemData);

      res.writeHead(200, {"Content-Type": "application/json"});
      return res.end(JSON.stringify(updatedItem));
    }
  } catch (error) {
    console.log(error);
  }
}

// Delete an item
// DELETE /api/items/:id
async function deleteItem(req, res, id) {
  try {
    const item = await Item.findById(id);

    if (!item) {
      res.writeHead(404, {"Content-Type": "application/json"});
      res.end(JSON.stringify({ message: "Item not found" }));
    } else {
      await Item.remove(id);

      res.writeHead(200, {"Content-Type": "application/json"});
      res.end(JSON.stringify({ message: `Item ${id} deleted` }));
    }
  } catch (error) {
    console.log(error);
  }
}

export {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem
};