import { Formik, FormikHelpers, Form } from "formik";
import React from "react";
import { BatchAssignmentFormValues } from "../../models/BatchAssignment.model";
import BatchAssignmentFormLayout from "../../components/BatchAssignmentFormLayout";
import { object, string } from "yup";

type Props = {
  onClose: () => void;
};

const AddBatchAssignmentFormWrapper = ({ onClose }: Props) => {
  const initialValues: BatchAssignmentFormValues = {
    name: "",
  };

  const validationSchema = object().shape({
    name: string().required("Please enter name"),
  });

  const handleSubmit = (
    values: BatchAssignmentFormValues,
    { resetForm, setSubmitting }: FormikHelpers<BatchAssignmentFormValues>
  ) => {
    setTimeout(() => {
      console.log(values, "Submit values");
      setSubmitting(false);
      resetForm();
    }, 1000);
  };

  return (
    <Formik<BatchAssignmentFormValues>
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {(formikProps) => (
        <Form>
          <BatchAssignmentFormLayout formikProps={formikProps} onClose={onClose} />
        </Form>
      )}
    </Formik>
  );
};

export default AddBatchAssignmentFormWrapper;
