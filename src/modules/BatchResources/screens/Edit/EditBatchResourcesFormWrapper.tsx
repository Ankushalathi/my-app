import { Formik, FormikHelpers, Form } from "formik";
import React from "react";
import { object, string } from "yup";
import { showToast } from "../../../../utils/showToaster";
import BatchResourceFormLayout from "../../components/BatchResourcesFormLayout";
import { BatchResourcesFormValues } from "../../models/BatchResources.model";

type Props = {
  onClose: () => void;
  categoryId: string;
};

const EditBatchResourcesFormWrapper = ({ onClose, categoryId }: Props) => {

  const initialValues: BatchResourcesFormValues = {
    resourceType: "",
    title: "",
    imageUrl: "",
    dataDescription: "",
  };
  const validationSchema = object().shape({
    categoryName: string().required("Please enter category name"),
    imageUrl: string().required("Please enter category image"),
  });

  const handleSubmit = (
    values: BatchResourcesFormValues,
    { resetForm, setSubmitting }: FormikHelpers<BatchResourcesFormValues>
  ) => {
    const formattedValues = {
      resourceType: values?.resourceType,
      title: values?.title,
      imageUrl: values?.imageUrl,
      dataDescription: values?.dataDescription
    };
    console.log(formattedValues)
    // updateCategory({ body: formattedValues, categoryId }).then((res: any) => {
    //   if (res?.error) {
    //     showToast("error", res?.error?.data?.message);
    //   } else {
    //     if (res?.data?.status) {
    //       showToast("success", res?.data?.message);
    //       resetForm();
    //       onClose();
    //     } else {
    //       showToast("error", res?.data?.message);
    //     }
    //   }
    //   setSubmitting(false);
    // });
  };

  return (
    <Formik<BatchResourcesFormValues>
      enableReinitialize
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {(formikProps) => (
        <Form>
          <BatchResourceFormLayout
            formikProps={formikProps}
            onClose={onClose}
            formType="UPDATE"
          />
        </Form>
      )}
    </Formik>
  );
};

export default EditBatchResourcesFormWrapper;
