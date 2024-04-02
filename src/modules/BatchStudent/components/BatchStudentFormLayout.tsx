import { FormikProps } from "formik";
import { BatchStudentFormValues } from "../models/BatchStudent.model";
import MOLFormDialog from "../../../components/molecules/MOLFormDialog/MOLFormDialog";
import ATMTextField from "../../../components/atoms/FormElements/ATMTextField/ATMTextField";

type Props = {
  formikProps: FormikProps<BatchStudentFormValues>;
  onClose: () => void;
};

const BatchStudentFormLayout = ({ formikProps, onClose }: Props) => {
  const { values, setFieldValue, isSubmitting, handleBlur, touched, errors } =
    formikProps;

  return (
    <MOLFormDialog
      title="Add BatchStudent"
      onClose={onClose}
      isSubmitting={isSubmitting}
    >
      <div className="flex flex-col gap-2">
        {/* Name */}
        <div className="">
          <ATMTextField
            name="name"
            value={values.name}
            onChange={(e) => setFieldValue("name", e.target.value)}
            label="Name"
            placeholder="Enter Name"
            onBlur={handleBlur}
            isTouched={touched?.name}
            errorMessage={errors?.name}
            isValid={!errors?.name}
          />
        </div>
      </div>
    </MOLFormDialog>
  );
};

export default BatchStudentFormLayout;
