import { Formik, FormikHelpers, Form } from "formik";
import { AdminRoleFormValues } from "../../models/AdminRole.model";
import AdminRoleFormLayout from "../../components/AdminRoleFormLayout";
import { object, string } from "yup";
import {
  useGetAdminRoleQuery,
  useUpdateAdminRoleMutation,
} from "../../service/AdminRoleServices";
import { useNavigate, useParams } from "react-router-dom";
import accessDataJson from "../../components/UserAccess/userAccessData.json";
import { useFetchData } from "../../../../hooks/useFetchData";
import { showToast } from "../../../../utils/showToaster";

type Props = {};

const EditAdminRoleFormWrapper = (props: Props) => {
  const { adminRoleId = "" } = useParams();

  const navigate = useNavigate();

  const [updateAdminRole] = useUpdateAdminRoleMutation();
  const { data, isLoading } = useFetchData(useGetAdminRoleQuery, {
    body: adminRoleId,
  });
  const initialValues: AdminRoleFormValues = {
    roleName: (data as any).roleName || "",
    modules: (data as any).modules || "",
  };

  const validationSchema = object().shape({
    roleName: string().required("Please enter name"),
  });

  const handleSubmit = (
    values: AdminRoleFormValues,
    { resetForm, setSubmitting }: FormikHelpers<AdminRoleFormValues>
  ) => {
    const userModules = accessDataJson?.accessData?.reduce(
      (result: string[], access) => {
        const isDependecyIncludes = access?.dependencies?.some((dependency) =>
          values?.modules?.includes(dependency)
        );

        if (isDependecyIncludes) {
          if (result?.includes(access?.moduleId)) {
            return result;
          } else {
            return [...result, access?.moduleId];
          }
        } else {
          const newValue = result?.filter((el) => el !== access?.moduleId);
          return newValue;
        }
      },
      [...values?.modules]
    );

    const formattedValues = {
      roleName: values?.roleName,
      modules: userModules,
    };
    updateAdminRole({ body: formattedValues, adminRoleId: adminRoleId }).then(
      (res: any) => {
        if (res?.error) {
          showToast("error", res?.error?.data?.message);
        } else {
          if (res?.data?.status) {
            showToast("success", res?.data?.message);
            resetForm();
            navigate(`/admin-role`);
          } else {
            showToast("error", res?.data?.message);
          }
        }
        setSubmitting(false);
      }
    );
  };

  return (
    <Formik<AdminRoleFormValues>
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      enableReinitialize
    >
      {(formikProps) => (
        <Form>
          <AdminRoleFormLayout
            formikProps={formikProps}
            formType="EDIT"
            onClose={() => navigate(`/admin-role`)}
            isLoading={isLoading}
          />
        </Form>
      )}
    </Formik>
  );
};

export default EditAdminRoleFormWrapper;
