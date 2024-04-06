import React from "react";
import { Form, Formik, FormikHelpers } from "formik";
import { object, string } from "yup";
import BatchAssignmentFormLayout from "../../components/BatchAssignmentFormLayout";
import { useAddAssignmentQuestionsMutation } from "../Services/AssignmentServices";
import { showToast } from "../../../../utils/showToaster";


type Props = {
  onClose: () => void;
  batchData: any;
};

export type AssignDialogFormValuesType = {
  assigment: any;
  tagId: any;
  searchValue: string;
  complexity: any;
  order: string;
};

const AssignDialogFormWrapper = ({ onClose, batchData }: Props) => {

  const [addAssign, addAssignInfo] = useAddAssignmentQuestionsMutation();

  // Form Initial Values
  const initialValues: AssignDialogFormValuesType = {
    assigment: "",
    tagId: "",
    searchValue: "",
    complexity: '',
    order: '',
  };

  // Validation Schema
  const validationSchema = object().shape({
    searchValue: string().required("Please enter searchValue"),
  });

  // Handle Submit
  const handleSubmit = (
    values: AssignDialogFormValuesType,
    { setSubmitting, resetForm }: FormikHelpers<AssignDialogFormValuesType>
  ) => {
    const formattedValues = {
      assigment: values?.assigment,
      tagId: values?.tagId,
      searchValue: values?.searchValue,
      complexity: values?.complexity,
      order: values?.order
    }
    addAssign(formattedValues).then((res: any) => {
      if (res?.error) {
        showToast("error", res?.error?.data?.message);
      } else {
        if (res?.data?.status) {
          showToast("success", res?.data?.message);
          resetForm();
          onClose();
        } else {
          showToast("error", res?.data?.message);
        }
      }
      setSubmitting(false);
    });

  };

  return (

    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formikProps) => (
        <Form>
          <BatchAssignmentFormLayout formType="ADD" batchData={batchData} addAssign={addAssign} addLoading={addAssignInfo?.isLoading} formikProps={formikProps} onClose={onClose} />
        </Form>
      )}
    </Formik>

  );
};

export default AssignDialogFormWrapper;