const fs = require("fs");
const path = require("path");

const folderName = process.argv[2];

if (!folderName) {
  console.error("Please provide a folder name.");
  process.exit(1);
}

const folderPath = path.join("./src/modules", folderName);

try {
  // Create the folder
  fs.mkdirSync(folderPath);

  // Creating components folder
  fs.mkdirSync(path.join(folderPath, "components"));

  // Creating models folder
  fs.mkdirSync(path.join(folderPath, "models"));

  // Creating screens folder
  fs.mkdirSync(path.join(folderPath, "screens"));

  // Creating utils folder
  fs.mkdirSync(path.join(folderPath, "utils"));

  // Creating slice folder
  fs.mkdirSync(path.join(folderPath, "slice"));
  const filePath = path.join(`${folderPath}/slice`, `${folderName}Slice.ts`);
  fs.writeFileSync(filePath, "Hello, this is a sample file!");

  // Creating service folder
  fs.mkdirSync(path.join(folderPath, "service"));

  console.log(
    `Folder '${folderName}' and file 'sample.txt' created successfully.`
  );
} catch (err) {
  console.error(`Error creating folder: ${err.message}`);
}
