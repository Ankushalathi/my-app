const fs = require("fs");
const path = require("path");
const { getSliceTemplate } = require("./templates/sliceTemplate");
const { getListWrapperTemplate } = require("./templates/listWrapperTemplate");
const { getListTemplate } = require("./templates/listTemplate");
const { addSliceToStore } = require("./addSliceToStore");
const { getModelTemplate } = require("./templates/modelTemplate");
const { createForm } = require("./createForm");

const folderName = process.argv[2];

if (!folderName) {
  console.error("Please provide a folder name.");
  process.exit(1);
}

const folderPath = path.join("./src/modules", folderName);

if (fs.existsSync(folderPath)) {
  console.log("This folder already exists");
} else {
  try {
    // Create the folder
    fs.mkdirSync(folderPath);

    // Creating components folder
    fs.mkdirSync(path.join(folderPath, "components"));

    // Creating models folder
    fs.mkdirSync(path.join(folderPath, "models"));
    const modelFilePath = path.join(
      `${folderPath}/models`,
      `${folderName}.model.ts`
    );
    fs.writeFileSync(modelFilePath, getModelTemplate(folderName));

    // Creating screens folder
    fs.mkdirSync(path.join(folderPath, "screens"));
    const listFolder = path.join(`${folderPath}/screens`, "List");
    fs.mkdirSync(listFolder);
    const listWrapperFile = path.join(
      `${listFolder}`,
      `${folderName}ListingWrapper.tsx`
    );
    const listFile = path.join(`${listFolder}`, `${folderName}Listing.tsx`);
    fs.writeFileSync(listWrapperFile, getListWrapperTemplate(folderName));
    fs.writeFileSync(listFile, getListTemplate(folderName));

    // Creating Form
    createForm(folderName);

    // Creating utils folder
    fs.mkdirSync(path.join(folderPath, "utils"));

    // Creating slice folder
    fs.mkdirSync(path.join(folderPath, "slice"));
    const filePath = path.join(`${folderPath}/slice`, `${folderName}Slice.ts`);
    fs.writeFileSync(filePath, getSliceTemplate(folderName));

    addSliceToStore(folderName);

    // Creating service folder
    fs.mkdirSync(path.join(folderPath, "service"));
  } catch (err) {
    console.error(`Error creating folder: ${err.message}`);
  }
}
