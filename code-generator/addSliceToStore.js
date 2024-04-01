const addSliceToStore = (moduleName) => {
  const sliceName = moduleName.toLowerCase();

  const fs = require("fs");

  const filePath = "./src/store.ts";
  const newLineToAdd = `${sliceName}: ${moduleName}Slice,`;
  const newImport = `import ${moduleName}Slice from "./modules/${moduleName}/slice/${moduleName}Slice";`;

  // Read the content of the file
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }

    // Modify the content to include the new line above the comment
    let modifiedContent = data.replace(
      "// Add More Slice Above",
      `${newLineToAdd}\n    // Add More Slice Above`
    );

    modifiedContent = modifiedContent.replace(
      "// Import New Slice Above",
      `${newImport}\n// Import New Slice Above`
    );

    // Write the modified content back to the file
    fs.writeFile(filePath, modifiedContent, "utf8", (writeErr) => {
      if (writeErr) {
        console.error("Error writing to file:", writeErr);
        return;
      }

      console.log("New Slice added to the store!");
    });
  });
};

module.exports = { addSliceToStore };
