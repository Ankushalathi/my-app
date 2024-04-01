import { Formik, FormikHelpers, Form } from "formik";
import React from "react";
import { object, string } from "yup";
import { BatchFormValues } from "../../models/Batch.model";
import BatchFormLayout from "../../components/BatchFormLayout";

type Props = {
  onClose: () => void;
};

const AddBatchFormWrapper = ({ onClose }: Props) => {
  
  const initialValues: BatchFormValues = {
    batchName: "",
    course:"",
    mode:"",
    startFrom:"",
    timings:"",
    language:"",
    seats:"",
  };

  const validationSchema = object().shape({
    batchName: string().required("Please enter batch name"),
    course: string().required("Please enter coirse"),
    mode: string().required("Please enter mode"),
    startFrom: string().required("Please enter start date"),
    timings: string().required("Please enter time"),
    language: string().required("Please enter language"),
    seats: string().required("Please enter seat"),
  });

  const handleSubmit = (
    values: BatchFormValues,
    { resetForm, setSubmitting }: FormikHelpers<BatchFormValues>
  ) => {
    setTimeout(() => {
      console.log(values, "Submit values");
      setSubmitting(false);
      resetForm();
    }, 1000);
  };

  return (
    <Formik<BatchFormValues>
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {(formikProps) => (
        <Form>
          <BatchFormLayout formikProps={formikProps} onClose={onClose} formType="ADD" />
        </Form>
      )}
    </Formik>
  );
};

export default AddBatchFormWrapper;
