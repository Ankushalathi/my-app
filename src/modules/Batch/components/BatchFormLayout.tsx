import { FormikProps } from "formik";
import { BatchFormValues } from "../models/Batch.model";
import MOLFormDialog from "../../../components/molecules/MOLFormDialog/MOLFormDialog";
import ATMTextField from "../../../components/atoms/FormElements/ATMTextField/ATMTextField";

type Props = {
  formikProps: FormikProps<BatchFormValues>;
  onClose: () => void;
  formType?:"ADD" | "EDIT"
};

const BatchFormLayout = ({ formikProps, onClose,formType }: Props) => {
  const { values, setFieldValue, isSubmitting, handleBlur, touched, errors } =
    formikProps;

  return (
      <MOLFormDialog
        title={formType==="ADD" ? "Add Batch" : "Update Batch"}
        onClose={onClose}
        isSubmitting={isSubmitting}
      >
        <div className="flex flex-col gap-2">
          {/* Name */}
          <div className="">
            <ATMTextField
              name="batchName"
              value={values.batchName}
              onChange={(e) => setFieldValue("batchName", e.target.value)}
              label="Batch Name"
              placeholder="Enter Batch Name"
              onBlur={handleBlur}
              isTouched={touched?.batchName}
              errorMessage={errors?.batchName}
              isValid={!errors?.batchName}
            />
          </div>
          <div className="">
            <ATMTextField
              name="batchName"
              value={values.batchName}
              onChange={(e) => setFieldValue("batchName", e.target.value)}
              label="Batch Name"
              placeholder="Enter Batch Name"
              onBlur={handleBlur}
              isTouched={touched?.batchName}
              errorMessage={errors?.batchName}
              isValid={!errors?.batchName}
            />
          </div>
          <div className="">
            <ATMTextField
              name="course"
              value={values.course}
              onChange={(e) => setFieldValue("course", e.target.value)}
              label="Course"
              placeholder="Enter Course"
              onBlur={handleBlur}
              isTouched={touched?.course}
              errorMessage={errors?.course}
              isValid={!errors?.course}
            />
          </div>
          <div className="">
            <ATMTextField
              name="mode"
              value={values.mode}
              onChange={(e) => setFieldValue("mode", e.target.value)}
              label="Mode"
              placeholder="Enter Mode"
              onBlur={handleBlur}
              isTouched={touched?.mode}
              errorMessage={errors?.mode}
              isValid={!errors?.mode}
            />
          </div>
          <div className="">
            <ATMTextField
              name="startFrom"
              value={values.startFrom}
              onChange={(e) => setFieldValue("startFrom", e.target.value)}
              label="Start From"
              placeholder="Enter Start From"
              onBlur={handleBlur}
              isTouched={touched?.startFrom}
              errorMessage={errors?.startFrom}
              isValid={!errors?.startFrom}
            />
          </div>
          <div className="">
            <ATMTextField
              name="timings"
              value={values.timings}
              onChange={(e) => setFieldValue("timings", e.target.value)}
              label="Timings"
              placeholder="Enter Timings"
              onBlur={handleBlur}
              isTouched={touched?.timings}
              errorMessage={errors?.timings}
              isValid={!errors?.timings}
            />
          </div>
          <div className="">
            <ATMTextField
              name="language"
              value={values.language}
              onChange={(e) => setFieldValue("language", e.target.value)}
              label="Language"
              placeholder="Enter Language"
              onBlur={handleBlur}
              isTouched={touched?.language}
              errorMessage={errors?.language}
              isValid={!errors?.language}
            />
          </div>
          <div className="">
            <ATMTextField
              name="seats"
              value={values.seats}
              onChange={(e) => setFieldValue("seats", e.target.value)}
              label="Seats"
              placeholder="Enter Seats"
              onBlur={handleBlur}
              isTouched={touched?.seats}
              errorMessage={errors?.seats}
              isValid={!errors?.seats}
            />
          </div>
        </div>
      </MOLFormDialog>
  );
};

export default BatchFormLayout;
