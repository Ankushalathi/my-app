const getFormTemplate = (moduleName) => {
  return `import { FormikProps } from "formik";
import ATMTextField from "src/components/atoms/FormElements/ATMTextField/ATMTextField";
import MOLFormDialog from "src/components/molecules/MOLFormDialog/MOLFormDialog";
import { ${moduleName}FormValues } from "../models/${moduleName}.model";

type Props = {
  formikProps: FormikProps<${moduleName}FormValues>;
  onClose: () => void;
};

const ${moduleName}FormLayout = ({ formikProps, onClose }: Props) => {
  const { values, setFieldValue, isSubmitting, handleBlur, touched, errors } =
    formikProps;

  return (
      <MOLFormDialog
        title="Add ${moduleName}"
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

export default ${moduleName}FormLayout;
`;
};

module.exports = { getFormTemplate };
