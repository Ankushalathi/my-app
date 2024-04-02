import { Formik, FormikHelpers, Form } from "formik";
import React from "react";
import { BatchStudentFormValues } from "../../models/BatchStudent.model";
import BatchStudentFormLayout from "../../components/BatchStudentFormLayout";
import { object, string } from "yup";

type Props = {
  onClose: () => void;
};

const AddBatchStudentFormWrapper = ({ onClose }: Props) => {
  const initialValues: BatchStudentFormValues = {
    name: "",
  };

  const validationSchema = object().shape({
    name: string().required("Please enter name"),
  });

  const handleSubmit = (
    values: BatchStudentFormValues,
    { resetForm, setSubmitting }: FormikHelpers<BatchStudentFormValues>
  ) => {
    setTimeout(() => {
      console.log(values, "Submit values");
      setSubmitting(false);
      resetForm();
    }, 1000);
  };

  return (
    <Formik<BatchStudentFormValues>
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {(formikProps) => (
        <Form>
          <BatchStudentFormLayout formikProps={formikProps} onClose={onClose} />
        </Form>
      )}
    </Formik>
  );
};

export default AddBatchStudentFormWrapper;
