import items from "../data/items.json" assert { type: "json" };
import { v4 as uuidv4 } from "uuid";
import { writeDataToFile } from "../utils.js";

function findAll() {
  return new Promise((resolve, reject) => {
    resolve(items);
  });
};

function findById(id) {
  return new Promise((resolve, reject) => {
    const item = items.find((item) => item.id === id);
    resolve(item)
  })
}

function create(item) {
  return new Promise((resolve, reject) => {
    const newItem = { id: uuidv4(), ...item };
    items.push(newItem);
    writeDataToFile("./data/items.json", items);
    resolve(newItem);
  });
}

function update(id, item) {
  return new Promise((resolve, reject) => {
    const index = items.findIndex((item) => item.id === id);
    items[index] = { ...items[index], ...item, id };
    writeDataToFile("./data/items.json", items);
    resolve(items[index]);
  });
}

function remove(id) {
  return new Promise((resolve, reject) => {
    const filteredItems = items.filter((item) => item.id !== id);
    writeDataToFile("./data/items.json", filteredItems);
    resolve();
  });
}

export {
  findAll,
  findById,
  create,
  update,
  remove
};