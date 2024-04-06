import { Attendance } from "../../models/Attendance.model";
import ATMDatePicker from "../../../../components/atoms/FormElements/ATMDatePicker/ATMDatePicker";
import { FormikProps } from "formik";
import { ATMButton } from "../../../../components/atoms/ATMButton/ATMButton";
import MOLFilterBar from "../../../../components/molecules/MOLFilterBar/MOLFilterBar";
import ATMPagination from "../../../../components/atoms/ATMPagination/ATMPagination";
import ATMDataNotFoundPage from "../../../../components/atoms/ATMDataNotFoundPage/ATMDataNotFoundPage";

type Props = {
  formikProps: FormikProps<Attendance>;
  rowData :any ;
  totalStudents: number;
  filterPaginationData: {
    totalCount: number;
    totalPages: number;
  };
  present: number;
  absent: number;
  onTime: number;
  late: number;
  date: Date | null;
  setAttendanceDate:any ;
};

const AttendanceListing = ({
  totalStudents,
  formikProps,
  rowData ,
  present,
  filterPaginationData: { totalCount, totalPages },
  absent,
  onTime,
  date,
  late,
  setAttendanceDate
}: Props) => {
  
  const { values, setFieldValue, handleSubmit } = formikProps;
 console.log(values ,"values")
  return (
    <>
      <div className="flex flex-col h-full gap-4 p-4 border  rounded-sm ">
        <div className="flex justify-around p-1 border-b  pb-2">
          <div className="flex flex-col gap-3 text-slate-600">
            <p className="font-bold">Total Students </p>
            <p className="text-lg font-bold text-center">{totalStudents ||0}</p>
          </div>
          <div className="flex flex-col gap-3 ">
            <p className="font-bold text-green-700">Present </p>
            <p className="text-lg font-bold text-center text-green-500">
              {present || 0}
            </p>
          </div>
          <div className="flex flex-col gap-3 ">
            <p className="font-bold text-red-700">Absent </p>
            <p className="text-lg font-bold text-center text-red-400">
              {absent || 0}
            </p>
          </div>
          <div className="flex flex-col gap-3 ">
            <p className="font-bold text-lime-700">On Time </p>
            <p className="text-lg font-bold text-center text-lime-500 ">
              {onTime || 0}
            </p>
          </div>
          <div className="flex flex-col gap-3 text-slate-600">
            <p className="font-bold text-orange-700">Late </p>
            <p className="text-lg font-bold text-center text-orange-400">{late || 0}</p>
          </div>
        </div>
        <div className="flex justify-between w-screen">
          <ATMDatePicker
            name="date"
            label=""
            onChange={(date)=>{setAttendanceDate(date)}}
            value={date}
          />
          <MOLFilterBar />
        </div>
        <div className="flex flex-col p-2 border rounded border-slate-300">
          <div className="flex flex-col gap-4">
            {values?.studentsData?.length ? 
              values?.studentsData?.map((data, ind) => (
              <div key={data._id} className="flex justify-between  border-b  pb-1">
                <p className=" capitalize">{data.name}</p>
                <p>{data.mobileNumber}</p>

                <div className="flex gap-3">
                  <p
                    className={`p-1  border rounded-lg cursor-pointer text-[12px] font-semibold ${
                      data?.isPresent ===  "P"
                        ? "bg-green-500 text-white"
                        : "bg-gray-50"
                    } w-[60px] text-center h-[30px]`}
                    onClick={() =>
                      setFieldValue(`studentsData[${ind}].isPresent`,  "P")
                    }
                  >
                    Present
                  </p>{" "}
                  <p
                    className={`p-1 border rounded-lg cursor-pointer text-[12px] font-semibold ${
                      data?.isPresent === "A"
                        ? "bg-red-500 text-white"
                        : "bg-gray-50"
                    } w-[60px] text-center h-[30px]`}
                    onClick={() =>
                      setFieldValue(`studentsData[${ind}].isPresent`, "A")
                    }
                  >
                    Absent
                  </p>
                </div>
                <div className="flex gap-3">
                  <div
                    className={`p-1 border rounded-lg cursor-pointer text-[12px] font-semibold ${
                      data?.cameOnTime === "YES"
                        ? "bg-green-500 text-white"
                        : "bg-gray-50"
                    } w-[60px] text-center h-[30px]`}
                    onClick={() =>
                      setFieldValue(`studentsData[${ind}].cameOnTime`, "YES")
                    }
                  >
                    On Time
                  </div>{" "}
                  <p
                    className={`p-1 border rounded-lg cursor-pointer text-[12px] font-semibold ${
                      data?.cameOnTime === 'NO'
                        ? "bg-red-500 text-white"
                        : "bg-gray-50"
                    } w-[60px] text-center h-[30px]`}
                    onClick={() =>
                      setFieldValue(`studentsData[${ind}].cameOnTime`, 'NO')
                    }
                  >
                    Late
                  </p>
                </div>
              </div>
            )) : <div> <ATMDataNotFoundPage message={'NO DATA FOUND'} /></div>}
          </div>
        </div>
          {/* Pagination */}
          <ATMPagination
            totalPages={totalPages}
            rowCount={totalCount}
            rows={rowData}
          />
        <div className="flex justify-end">
          <ATMButton
            children="Save"
            size="small"
            extraClasses="w-[100px]"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </>
  );
};

export default AttendanceListing;
