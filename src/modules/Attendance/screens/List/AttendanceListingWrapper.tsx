import AttendanceListing from "./AttendanceListing";
import { Attendance } from "../../models/Attendance.model";
import { Formik, FormikHelpers } from "formik";
import { Form } from "react-router-dom";
type Props = {};

const AttendanceListingWrapper = (props: Props) => {

  const initialValues: Attendance = {
    studentsData:[
      {
        name: "Vishal",
        mobileNumber: "9758483933",
        isPresent:false,
        cameOnTime:false,
        _id: "1",
      },
      {
        name: "Vikas",
        mobileNumber: "9758483933",
        _id: "2",
        isPresent:false,
        cameOnTime:false,
      },
    ]
  };

  const handleSubmit = (
    values: Attendance,
    { resetForm, setSubmitting }: FormikHelpers<Attendance>
  ) => {
    setTimeout(() => {
      console.log(values, "Submit values");
      setSubmitting(false);
      resetForm();
    }, 1000);
  };
  return (
    <>
      <Formik<Attendance>
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {(formikProps) => (
          <Form>
            <AttendanceListing
              formikProps={formikProps}
              totalStudents={100}
              present={60}
              absent={40}
              onTime={40}
              late={20}
              date={new Date()}
            />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AttendanceListingWrapper;
