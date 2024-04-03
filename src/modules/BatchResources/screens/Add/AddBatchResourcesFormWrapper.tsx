import { Formik, FormikHelpers, Form } from "formik";
import React from "react";
import { BatchResourcesFormValues } from "../../models/BatchResources.model";
import { object, string } from "yup";
import BatchResourceFormLayout from "../../components/BatchResourcesFormLayout";
import { useAddResourceMutation } from "../../service/ResourcesServices";
import { showToast } from "../../../../utils/showToaster";

type Props = {
  onClose: () => void;
};

const AddBatchResourcesFormWrapper = ({ onClose }: Props) => {
  const [addResource] = useAddResourceMutation()

  const initialValues: BatchResourcesFormValues = {
    resourceType: [],
    title: "",
    imageUrl: [],
    dataDescription: ""
  };

  const validationSchema = object().shape({
    title: string().required("Please enter title"),
  });

  const handleSubmit = (
    values: BatchResourcesFormValues,
    { resetForm, setSubmitting }: FormikHelpers<BatchResourcesFormValues>
  ) => {
    const formattedValues ={
      title: values?.title ,
      description: values?.dataDescription,
      imageUrl:values?.imageUrl,
      type: values?.resourceType?.value ,
  }

    addResource(formattedValues).then((res: any) => {
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
    <Formik<BatchResourcesFormValues>
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {(formikProps) => (
        <Form>
          <BatchResourceFormLayout formikProps={formikProps} onClose={onClose} formType="ADD" />
        </Form>
      )}
    </Formik>
  );
};

export default AddBatchResourcesFormWrapper;
