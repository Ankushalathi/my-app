import { Formik, FormikHelpers, Form } from "formik";
import React from "react";
import { object, string } from "yup";
import { showToast } from "../../../../utils/showToaster";
import BatchResourceFormLayout from "../../components/BatchResourcesFormLayout";
import { BatchResourcesFormValues } from "../../models/BatchResources.model";
import { useEditResourceMutation, useGetResourceByIdQuery } from "../../service/ResourcesServices";
import { useFetchData } from "../../../../hooks/useFetchData";

type Props = {
  onClose: () => void;
  ResourceEditId: any;
};

const EditBatchResourcesFormWrapper = ({ onClose, ResourceEditId }: Props) => {
  const [EditResource] = useEditResourceMutation()
  const { data, isLoading } = useFetchData(useGetResourceByIdQuery, {
    body: ResourceEditId,
    dataType: "VIEW",
  })

  const initialValues: BatchResourcesFormValues = {
    resourceType: {
      label: (data as any)?.type,
      value: (data as any)?.type
    } || "",
    title: (data as any)?.title || "",
    imageUrl: (data as any)?.imageUrl || "",
    dataDescription: (data as any)?.description || "",
  };
  const validationSchema = object().shape({
    resourceType: object().required("Please enter category name"),
    title: string().required("Please enter category image"),

  });

  const handleSubmit = (
    values: BatchResourcesFormValues,
    { resetForm, setSubmitting }: FormikHelpers<BatchResourcesFormValues>
  ) => {
    const formattedValues = {
      type: values?.resourceType.value,
      title: values?.title,
      imageUrl: values?.imageUrl,
      description: values?.dataDescription
    };
    EditResource({ body: formattedValues, ResourceEditId }).then((res: any) => {
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
            isLoading={isLoading}
          />

        </Form>
      )}
    </Formik>
  );
};

export default EditBatchResourcesFormWrapper;  
