
import React from "react";
import BatchStudentListing from "./BatchStudentListing";
import { BatchStudent } from "../../models/BatchStudent.model";
import { useDispatch, useSelector } from "react-redux";
import { setIsOpenAddDialog } from "../../slice/BatchStudentSlice";
import AddBatchStudentFormWrapper from "../Add/AddBatchStudentFormWrapper";
import { TableHeader } from "../../../../components/molecules/MOLTable/MOLTable";
import { AppDispatch, RootState } from "../../../../store";
import { formatedDateTimeIntoIst } from "../../utils/dateTimeFormate";

type Props = {};

const listData: BatchStudent[] = [
  {
    dateTime: "01 Apr 2024",
    name: "Himanshu jain",
    mobileNumber: 888964793,
    email: "Himanshu@gmail.com",
    _id: "1",

  },
  {
    dateTime: "10 Apr 2024",
    name: "Anuj Joshi",
    mobileNumber: 828964793,
    email: "Anuj@gmail.com",
    _id: "1",
  },
  {
    dateTime: "21 Apr 2024",
    name: "Goutam Sharma",
    mobileNumber: 818964793,
    email: "Goutam@gmail.com",
    _id: "1",
  },
  {
    dateTime: "25 Apr 2024",
    name: "Gourav Sharma",
    mobileNumber: 858964793,
    email: "Gourav@gmail.com",
    _id: "1",
  },
  {
    dateTime: "30 Apr 2024",
    name: "Deepak Sisodiya",
    mobileNumber: 888964793,
    email: "Deepak@gmail.com",
    _id: "1",
  }
];

const tableHeaders: TableHeader<BatchStudent>[] = [
  {
    fieldName: "dateTime",
    headerName: "Date-Time",
    highlight: true,
    flex: "flex-[1_1_0%]",
    renderCell: (row) => (<div>
      <div className="font-medium text-slate-700">
        {formatedDateTimeIntoIst(row.dateTime, "DD MMM yyyy")}
      </div>
      <div className="text-[13px] font-medium text-slate-400">
        {formatedDateTimeIntoIst(row.dateTime, "hh:mm A")}
      </div>
    </div>)


  },
  {
    fieldName: "name",
    headerName: "Name",
    flex: "flex-[1_0_0%]",
  },
  {
    fieldName: "mobileNumber",
    headerName: "Mobile Number",
    flex: "flex-[1_0_0%]",
  },
  {
    fieldName: "email",
    headerName: "Email",
    extraClasses: () => "min-w-[100px]",
    flex: "flex-[1_0_0%]",
  }
];

const BatchStudentListingWrapper = (props: Props) => {
  const { isOpenAddDialog } = useSelector((state: RootState) => state?.batchstudent);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <BatchStudentListing
        tableHeaders={tableHeaders}
        rowData={listData}
        filterPaginationData={{
          totalCount: 100,
          totalPages: 5,
        }}
      />

      {isOpenAddDialog && (
        <AddBatchStudentFormWrapper
          onClose={() => dispatch(setIsOpenAddDialog(false))}
        />
      )}
    </>
  );
};

export default BatchStudentListingWrapper;

