import { FormikProps } from "formik";
import { LoginFormInitialValues } from "./LoginFormWrapper";
import ATMTextField from "../../components/atoms/FormElements/ATMTextField/ATMTextField";
import ATMPasswordField from "../../components/atoms/FormElements/ATMPasswordField/ATMPasswordField";
import { ATMButton } from "../../components/atoms/ATMButton/ATMButton";
type Props = {
  formikProps: FormikProps<LoginFormInitialValues>;
};

const LoginForm = ({ formikProps }: Props) => {
  const { values, setFieldValue, isSubmitting, handleBlur, errors, touched } =
    formikProps;

  return (
    <div className="flex flex-col-reverse justify-end h-screen md:p-4 lg:p-4 lg:flex-row bg-primary-95 md:bg-white">
      <div className="p-4 md:p-0 -mt-[30%] md:mt-auto h-fit md:h-full w-full lg:w-1/2">
        <div className="flex items-center justify-center w-full h-full p-8 bg-white rounded-md ">
          <div className="flex flex-col gap-6  md:w-[500px] w-full h-fit">
            <div className="flex flex-col gap-2">
              <i className="font-medium">Welcome!</i>
              <div className="text-xl font-bold"> Login in Sachcha Bhaav </div>
            </div>

            <div className="flex flex-col gap-4">
              {/* User Name */}
              <div className="">
                <ATMTextField
                  name="userName"
                  value={values.userName}
                  onChange={(e) => setFieldValue("userName", e.target.value)}
                  label="User Name"
                  placeholder="Enter User Name"
                  onBlur={handleBlur}
                  isTouched={touched?.userName}
                  errorMessage={errors?.userName}
                  isValid={!errors?.userName}
                />
              </div>

              {/* Password */}
              <div className="">
                <ATMPasswordField
                  name="password"
                  value={values.password}
                  onChange={(e) => setFieldValue("password", e.target.value)}
                  label="Password"
                  onBlur={handleBlur}
                  isTouched={touched?.password}
                  errorMessage={errors?.password}
                  isValid={!errors?.password}
                />
              </div>
            </div>
            <div>
              <ATMButton isLoading={isSubmitting} type="submit">
                Login
              </ATMButton>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-1/2 md:h-full lg:w-1/2 lg:block ">
        <div className="flex flex-col items-center justify-center gap-4 p-4 text-center rounded-lg md:items-start md:text-start md:justify-between login-img">
          <p className="text-4xl text-white md:text-2xl">Sachcha Bhaav</p>
          <div className="flex flex-col gap-1">
            <p className="text-xl text-white md:text-4xl">
              {" "}
              Centralized Business Management Hub
            </p>
            <p className="text-sm text-neutral-80 md:text-xl">
              {" "}
              Streamline all your operations, from finances to customer
              interactions, in one convenient platform Simplify your worklflow,
              increase efficiency, and stay organized with our comprehensive
              solution.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
