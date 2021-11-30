import { v4 as uuidv4 } from "uuid";
import * as fs from "fs/promises";

async function writeFile(filePath, data) {
  const writeData =
    typeof data === "string" || data instanceof String
      ? data
      : JSON.stringify(data, null, 2);

  return fs.writeFile(filePath, writeData).catch((error) => {
    console.log(`Error writing data to ${filePath}.`);

    throw error;
  });
}

async function readFile(filePath) {
  return fs
    .readFile(filePath, "utf8")
    .then((data) => JSON.parse(data))
    .catch((error) => {
      console.log(`Error reading data from ${filePath}.`);

      throw error;
    });
}

const generateId = () => uuidv4();

module.exports = {
  writeFile,
  readFile,
  generateId,
};
