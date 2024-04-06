import React, { useEffect, useState } from "react";
import BatchStudentListing from "./BatchStudentListing";
import { BatchStudent } from "../../models/BatchStudent.model";
import { setIsOpenAddDialog } from "../../slice/BatchStudentSlice";
import AddBatchStudentFormWrapper from "../Add/AddBatchStudentFormWrapper";
import { TableHeader } from "../../../../components/molecules/MOLTable/MOLTable";
import { AppDispatch, RootState } from "../../../../store";
import { formatedDateTimeIntoIst } from "../../../../utils/dateTimeFormat";
import { useSelector, useDispatch } from "react-redux";
import { useGetNotCompletedAssignmentsStudentsQuery } from "../../service/StudentServices";
import { useParams } from "react-router-dom";
import { useFilterPagination } from "../../../../hooks/useFilterPagination";

type Props = {};
const tableHeaders: TableHeader<BatchStudent>[] = [
  {
    fieldName: "createdAt",
    headerName: "Date-Time",
    highlight: true,
    flex: "flex-[1_1_0%]",
    renderCell: (row) => (
      <div>
        <div className="font-medium text-slate-700">
          {formatedDateTimeIntoIst(row.createdAt, "DD MMM yyyy")}
        </div>
        <div className="text-[13px] font-medium text-slate-400">
          {formatedDateTimeIntoIst(row.createdAt, "hh:mm A")}
        </div>
      </div>
    ),
  },
  {
    fieldName: "name",
    headerName: "Name",
    flex: "flex-[1_0_0%]",
  },
  {
    fieldName: "mobile",
    headerName: "Mobile Number",
    flex: "flex-[1_0_0%]",
  },
  {
    fieldName: "email",
    headerName: "Email",
    extraClasses: () => "min-w-[100px]",
    flex: "flex-[1_0_0%]",
  },
  {
    fieldName: "notSubmittedAssignmentsCount",
    headerName: "Not Submitted Assignments",
    flex: "flex-[1.5_1.5_0%]",
    align :'center',
     renderCell:(row:any)=>{
      return(
          <span className='font-medium  text-red-600'>{row?.notSubmittedAssignmentsCount || 0}</span>
       
      )
     }
  },

  {
    fieldName: "totalAssignments",
    headerName: "Total Assignments",
    flex: "flex-[1.5_1.5_0%]",
    align :'center',
     renderCell:(row:any)=>{
      return(
        <span className='font-medium'>  {row?.totalAssignments || 0} </span>
          
      )
     }
  },
];

const BatchStudentListingWrapper = (props: Props) => {
  const { batchId } = useParams()
  const { isOpenAddDialog } = useSelector(
    (state: RootState) => state?.batchstudent
  );
  const dispatch = useDispatch<AppDispatch>();
  const { searchQuery, page, limit } = useFilterPagination()
  const [studentData, setStudentData] = useState<any>()
  const { data, isLoading, isFetching } = useGetNotCompletedAssignmentsStudentsQuery({
    searchValue: searchQuery,
    batchId:batchId ,
    limit: limit,
    params: [
      "name",
      "mobile",
      "email",
    ],
    page: page, 
    filterBy: [{
      fieldName : 'batches.batchId',
      value :batchId
  }],
    dateFilter: {},
    orderBy: "createdAt",
    orderByValue: -1,
    isPaginationRequired: true
  })
  useEffect(() => {
    if (!isLoading && !isFetching) {
      setStudentData(data?.data)
    }
  }, [data, isLoading, isFetching])

  return (
    <>
      <BatchStudentListing
        tableHeaders={tableHeaders}
        rowData={studentData}
        filterPaginationData={{
          totalCount: 10,
          totalPages: 10,
        }}
        isTableLoading={isLoading}
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
