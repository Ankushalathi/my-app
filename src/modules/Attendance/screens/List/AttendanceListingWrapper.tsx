import AttendanceListing from "./AttendanceListing";
import { Attendance } from "../../models/Attendance.model";
import { Formik, FormikHelpers } from "formik";
import { Form, useParams } from "react-router-dom";
import {
  useGetAllStudentOfBatchQuery,
  useGetAllStudentAttendanceCountQuery,
  useUpdateAttendanceMutation,
} from "../../service/AttendanceService";
import { useFetchData } from "../../../../hooks/useFetchData";
import moment from "moment";
import { useState } from "react";
import { showToast } from "../../../../utils/showToaster";
import { useFilterPagination } from "../../../../hooks/useFilterPagination";
import ATMCircularProgress from "../../../../components/atoms/ATMCircularProgress/ATMCircularProgress";
type Props = {};

const AttendanceListingWrapper = (props: Props) => {
  const { batchId } = useParams();

  const { searchQuery, page, limit } = useFilterPagination();

  const [attendanceDate, setAttendanceDate] = useState<any>(new Date());

  console.log(attendanceDate, "attendanceDateattendanceDate");

  const { data, isLoading, totalPages, totalData } = useFetchData(
    useGetAllStudentOfBatchQuery,
    {
      body: {
        limit: limit,
        searchValue: searchQuery,
        params: ["studentName"],
        page:page,
        filterBy: [
          {
            fieldName: "batchId",
            value: batchId,
          },
        ],
        dateFilter: {
          startDate: moment(attendanceDate).format("YYYY-MM-DD"),
          endDate: moment(attendanceDate).format("YYYY-MM-DD"),
        },
        orderBy: "createdAt",
        orderByValue: -1,
        isPaginationRequired: true,
      },
    }
  );

  const { data: countData, isLoading: countIsLoading } = useFetchData(
    useGetAllStudentAttendanceCountQuery,
    {
      body: {
        filterBy: [{ fieldName: "batchId", value: batchId }],
        dateFilter: {
          startDate: moment(attendanceDate).format("YYYY-MM-DD"),
          endDate: moment(attendanceDate).format("YYYY-MM-DD"),
        },
      },
    }
  );

  const [updateAttenDance] = useUpdateAttendanceMutation();

  console.log();

  const initialValues: Attendance = {
    studentsData: data?.map((el: any) => {
      return {
        name: el?.studentName,
        mobileNumber: el?.mobileNumber,
        isPresent: el?.isPresent,
        cameOnTime: el?.cameOnTime,
        _id: el?._id,
      };
    }),
  };

  const handleSubmit = (
    values: Attendance,
    { resetForm, setSubmitting }: FormikHelpers<Attendance>
  ) => {
    const newArray = values?.studentsData?.map((ele: any) => {
      return {
        Id: ele._id,
        presentStatus: ele.isPresent,
        cameOnTimeStatus: ele.cameOnTime || "NA",
      };
    });
    updateAttenDance({
      studentInfo: newArray,
    }).then((res: any) => {
      if (res?.error) {
        showToast("error", res?.error?.data?.message);
      } else {
        if (res?.data?.status) {
          showToast("success", res?.data?.message);
          resetForm()
        } else {
          showToast("error", res?.data?.message);
        }
      }
    });
  };
  return (
    <>
      <Formik<Attendance>
        enableReinitialize
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {(formikProps) => (
          <Form> 
             {(isLoading || countIsLoading ) && (
                <div className="absolute w-[100%] h-[100%] flex justify-center items-center z-10 bg-slate-100 opacity-50">
                  <ATMCircularProgress/>
                </div>
              )}
            <AttendanceListing 
            rowData={data}
             filterPaginationData={{
              totalCount: totalData,
              totalPages: totalPages,
            }}
              formikProps={formikProps}
              totalStudents={countData?.[0]?.totalStudentCount}
              setAttendanceDate={setAttendanceDate}
              present={countData?.[0]?.totalPresent}
              absent={countData?.[0]?.totalAbsent}
              onTime={countData?.[0]?.totalOnTime}
              late={countData?.[0]?.totalNotOnTime}
              date={attendanceDate}
            />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AttendanceListingWrapper;
