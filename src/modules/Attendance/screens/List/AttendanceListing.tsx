import { Attendance } from "../../models/Attendance.model";
import ATMDatePicker from "../../../../components/atoms/FormElements/ATMDatePicker/ATMDatePicker";
import { FormikProps } from "formik";
import { ATMButton } from "../../../../components/atoms/ATMButton/ATMButton";
import MOLFilterBar from "../../../../components/molecules/MOLFilterBar/MOLFilterBar";

type Props = {
  formikProps: FormikProps<Attendance>;
  totalStudents: number;
  present: number;
  absent: number;
  onTime: number;
  late: number;
  date: Date | null;
};

const AttendanceListing = ({
  totalStudents,
  formikProps,
  present,
  absent,
  onTime,
  date,
  late,
}: Props) => {
  const { values, setFieldValue, handleSubmit } = formikProps;

  return (
    <>
      <div className="flex flex-col h-full gap-4 p-1">
        <div className="flex justify-around p-1">
          <div className="flex flex-col gap-3 text-slate-600">
            <p className="font-bold">Total Students </p>
            <p className="text-lg font-bold text-center">{totalStudents}</p>
          </div>
          <div className="flex flex-col gap-3 ">
            <p className="font-bold text-green-600">Present </p>
            <p className="text-lg font-bold text-center text-green-500">
              {present}
            </p>
          </div>
          <div className="flex flex-col gap-3 ">
            <p className="font-bold text-red-600">Absent </p>
            <p className="text-lg font-bold text-center text-red-400">
              {absent}
            </p>
          </div>
          <div className="flex flex-col gap-3 ">
            <p className="font-bold text-orange-600">On Time </p>
            <p className="text-lg font-bold text-center text-orange-400">
              {onTime}
            </p>
          </div>
          <div className="flex flex-col gap-3 text-slate-600">
            <p className="font-bold">Late </p>
            <p className="text-lg font-bold text-center">{late}</p>
          </div>
        </div>
        <div className="flex justify-between w-screen">
          <ATMDatePicker
            name="date"
            label=""
            onChange={() => {}}
            value={date}
          />
          <MOLFilterBar/>
        </div>
        <div className="flex flex-col p-2 border rounded border-slate-300">
          <div className="flex flex-col gap-4">
            {values?.studentsData?.map((data, ind) => (
              <div key={data._id} className="flex justify-between">
                <p>{data.name}</p>
                <p>{data.mobileNumber}</p>

                <div className="flex gap-3">
                  <p
                    className={`p-1 border rounded-lg ${
                      data?.isPresent === true
                        ? "bg-green-200 text-green-700"
                        : "bg-gray-50"
                    } w-[80px] text-center`}
                    onClick={() =>
                      setFieldValue(`studentsData[${ind}].isPresent`, true)
                    }
                  >
                    Present
                  </p>{" "}
                  <p
                    className={`p-1 border rounded-lg ${
                      data?.isPresent === false
                        ? "bg-red-200 text-red-700"
                        : "bg-gray-50"
                    } w-[80px] text-center`}
                    onClick={() =>
                      setFieldValue(`studentsData[${ind}].isPresent`, false)
                    }
                  >
                    Absent
                  </p>
                </div>
                <div className="flex gap-3">
                  <div
                    className={`p-1 border rounded-lg ${
                      data?.cameOnTime === true
                        ? "bg-green-200 text-green-700"
                        : "bg-gray-50"
                    } w-[80px] text-center`}
                    onClick={() =>
                      setFieldValue(`studentsData[${ind}].cameOnTime`, true)
                    }
                  >
                    On Time
                  </div>{" "}
                  <p
                    className={`p-1 border rounded-lg ${
                      data?.cameOnTime === false
                        ? "bg-red-200 text-red-700"
                        : "bg-gray-50"
                    } w-[80px] text-center`}
                    onClick={() =>
                      setFieldValue(`studentsData[${ind}].cameOnTime`, false)
                    }
                  >
                    Late
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
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
