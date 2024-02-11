import { writeFile } from "fs";
import { join } from "path";

// // Example usage
// const myData = {
//     name: "John Doe",
//     age: 30,
//     active: true
// };

// writeObjectToJsonFile('example.json', myData)
//     .then(() => console.log('Data written successfully.'))
//     .catch((error) => console.error('Failed to write data:', error));

/**
 * Writes an object to a formatted JSON file in the /data directory.
 * @param fileName The name of the file to create.
 * @param data The object to be written to the file.
 */
export function writeObjectToJsonFile(
  fileName: string,
  data: object,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const filePath = join(process.cwd(), "data", fileName);
    const jsonData = JSON.stringify(data, null, 2);
    writeFile(filePath, jsonData, "utf8", (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}
