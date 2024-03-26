import { Form, Formik, FormikHelpers } from "formik";
import { useDispatch, useSelector } from "react-redux";

import { object, string } from "yup";
import LoginForm from "./LoginForm";

import { Navigate, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import {
  setAccessToken,
  setIsLogin,
  setRefreshToken,
  setUserData,
} from "../../slices/AuthSlice";
import {
  authTokenKeyName,
  refreshTokenKeyName,
} from "../../utils/configs/authConfig";
import { useLoginMutation } from "../../services/AuthServices";
import { showToast } from "../../utils/showToaster";

export type LoginFormInitialValues = {
  userName: string;
  password: string;
};

const LoginFormWrapper = () => {
  const { returnUrl, isLogin } = useSelector((state: RootState) => state?.auth);
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const afterLogin = (res: any) => {
    const userData = {
      userName: res?.userName,
      name: res?.name,
      userId: res?.adminId,
      userType: res?.userType,
      email: res?.email,
      mobile: res?.mobile,
    };

    dispatch(setUserData(userData));
    dispatch(setIsLogin(true));
    dispatch(setAccessToken(res?.token));
    dispatch(setRefreshToken(res?.refreshToken));
    localStorage.setItem(authTokenKeyName, res?.token);
    localStorage.setItem(refreshTokenKeyName, res?.refreshToken);
    localStorage.setItem("isLogin", "true");
    localStorage.setItem("deviceId", res?.deviceId);

    navigate(returnUrl ? `/${returnUrl}` : "/");
  };

  const [login] = useLoginMutation();

  const initialValues: LoginFormInitialValues = {
    userName: "",
    password: "",
  };

  const validationSchema = object({
    userName: string().required("Please enter user name"),
    password: string().required("Password is required"),
  });

  const handleSubmit = (
    values: LoginFormInitialValues,
    { setSubmitting }: FormikHelpers<LoginFormInitialValues>
  ) => {
    setSubmitting(true);

    login(values).then((res: any) => {
      setSubmitting(false);
      if (res.error) {
        showToast("error", res?.error?.data?.message);
      } else {
        if (res?.data?.status) {
          afterLogin(res?.data?.data);
          showToast("success", res?.data?.message);
        } else {
          showToast("error", res?.data?.message);
        }
      }
    });
  };

  if (isLogin) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formikProps) => (
          <Form>
            <LoginForm formikProps={formikProps} />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LoginFormWrapper;
