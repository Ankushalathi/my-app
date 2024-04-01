const getModelTemplate = (moduleName) => {
  return `export type ${moduleName} = {
  name: string;
  email: string;
  age: number;
  amount: number;
  _id: string;
};

export type ${moduleName}FormValues = {
  name: string;
};
`;
};

module.exports = { getModelTemplate };
