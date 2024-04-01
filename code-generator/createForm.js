const fs = require("fs");
const path = require("path");
const { getFormTemplate } = require("./templates/formTemplate");
const {
  getAddFormWrapperTemplate,
} = require("./templates/addFormWrapperTemplate");

const createForm = (moduleName) => {
  const addFolderPath = path.join(`./src/modules/${moduleName}/screens`, "Add");
  fs.mkdirSync(addFolderPath);
  const formLayoutFile = path.join(
    `./src/modules/${moduleName}/components`,
    `${moduleName}FormLayout.tsx`
  );

  fs.writeFileSync(
    path.join(addFolderPath, `Add${moduleName}FormWrapper.tsx`),
    getAddFormWrapperTemplate(moduleName)
  );
  fs.writeFileSync(formLayoutFile, getFormTemplate(moduleName));
};

module.exports = { createForm };
