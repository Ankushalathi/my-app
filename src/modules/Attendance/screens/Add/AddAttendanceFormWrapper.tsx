// import { Formik, FormikHelpers, Form } from "formik";
// import React from "react";
// import { AttendanceFormValues } from "../../models/Attendance.model";
// import AttendanceFormLayout from "../../components/AttendanceFormLayout";
// import { object, string } from "yup";

// type Props = {
//   onClose: () => void;
// };

// const AddAttendanceFormWrapper = ({ onClose }: Props) => {
//   const initialValues: AttendanceFormValues = {
//     name: "",
//   };

//   const validationSchema = object().shape({
//     name: string().required("Please enter name"),
//   });

//   const handleSubmit = (
//     values: AttendanceFormValues,
//     { resetForm, setSubmitting }: FormikHelpers<AttendanceFormValues>
//   ) => {
//     setTimeout(() => {
//       console.log(values, "Submit values");
//       setSubmitting(false);
//       resetForm();
//     }, 1000);
//   };

//   return (
//     <Formik<AttendanceFormValues>
//       initialValues={initialValues}
//       onSubmit={handleSubmit}
//       validationSchema={validationSchema}
//     >
//       {(formikProps) => (
//         <Form>
//           <AttendanceFormLayout formikProps={formikProps} onClose={onClose} />
//         </Form>
//       )}
//     </Formik>
//   );
// };

// export default AddAttendanceFormWrapper;
import React from 'react'

const AddAttendanceFormWrapper = () => {
  return (
    <div>AddAttendanceFormWrapper</div>
  )
}

export default AddAttendanceFormWrapper