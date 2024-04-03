import React from "react";
import { FormikProps } from "formik";
import ATMTextArea from "../../../components/atoms/FormElements/ATMTextArea/ATMTextArea";
import ATMSelect from "../../../components/atoms/FormElements/ATMSelect/ATMSelect";
import ATMTextField from "../../../components/atoms/FormElements/ATMTextField/ATMTextField";
import { BatchResourcesFormValues } from "../models/BatchResources.model";
import ATMFileUploader from "../../../components/atoms/FormElements/ATMFileUploader/ATMFileUploader";
import MOLFormDialog from "../../../components/molecules/MOLFormDialog/MOLFormDialog";

type Props = {
  formikProps: FormikProps<BatchResourcesFormValues>;
  onClose: () => void;
  formType: "ADD" | "UPDATE";
};

const resourceTypeData = [
  {
    label: "IMAGE",
    value: "IMAGE",
  },
  {
    label: "DATA",
    value: "DATA",
  },
];

const BatchResourceFormLayout = ({ formikProps, onClose, formType }: Props) => {
  const { values, setFieldValue, isSubmitting, handleBlur } = formikProps;
  console.log(values)

  return (
    <MOLFormDialog
      title=""
      onClose={onClose}
      isSubmitting={isSubmitting}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="text-xl font-medium">
            {formType === "ADD" ? "Add Resource" : "Update Resource"}{" "}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {/* Resource Type */}
          <div className="">
            <ATMSelect
              name="resourceType"
              value={values.resourceType}
              onChange={(newValue) => setFieldValue("resourceType", newValue)}
              onBlur={handleBlur}
              label="Resource Type"
              placeholder="Select Resource Type"
              options={resourceTypeData}
            />
          </div>
          <div>
            <ATMTextField
              placeholder="Enter Title"
              name="title"
              value={values?.title}
              onChange={(e) => {
                setFieldValue("title", e.target.value);
              }}
              label="Title"
              onBlur={handleBlur}
            />
          </div>
          {values?.resourceType?.value === "IMAGE" && (
            <div className="mt-4">
              <ATMFileUploader
                value={values?.imageUrl}
                accept="hello"
                onChange={(imgUrl: any) => {
                  setFieldValue("imageUrl", imgUrl);
                }}
                name="imageUrl"
                label="File"
              />
            </div>
          )}
          {values?.resourceType?.value === "DATA" && (
            <ATMTextArea
              placeholder="Enter Description"
              name="dataDescription"
              label="Data "
              value={values?.dataDescription}
              onChange={(newValue) => {
                setFieldValue("dataDescription", newValue);
              }}
            />
          )}
        </div>
     
      </div>
    </MOLFormDialog>
  );
};

export default BatchResourceFormLayout;