const getAddFormWrapperTemplate = (moduleName) => {
  return `import { Formik, FormikHelpers, Form } from "formik";
import React from "react";
import { ${moduleName}FormValues } from "../../models/${moduleName}.model";
import ${moduleName}FormLayout from "../../components/${moduleName}FormLayout";
import { object, string } from "yup";

type Props = {
  onClose: () => void;
};

const Add${moduleName}FormWrapper = ({ onClose }: Props) => {
  const initialValues: ${moduleName}FormValues = {
    name: "",
  };

  const validationSchema = object().shape({
    name: string().required("Please enter name"),
  });

  const handleSubmit = (
    values: ${moduleName}FormValues,
    { resetForm, setSubmitting }: FormikHelpers<${moduleName}FormValues>
  ) => {
    setTimeout(() => {
      console.log(values, "Submit values");
      setSubmitting(false);
      resetForm();
    }, 1000);
  };

  return (
    <Formik<${moduleName}FormValues>
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {(formikProps) => (
        <Form>
          <${moduleName}FormLayout formikProps={formikProps} onClose={onClose} />
        </Form>
      )}
    </Formik>
  );
};

export default Add${moduleName}FormWrapper;
`;
};

module.exports = { getAddFormWrapperTemplate };
