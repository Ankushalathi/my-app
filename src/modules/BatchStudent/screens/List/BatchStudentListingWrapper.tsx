import React, { useEffect, useState } from "react";
import BatchStudentListing from "./BatchStudentListing";
import { BatchStudent } from "../../models/BatchStudent.model";
import { setIsOpenAddDialog } from "../../slice/BatchStudentSlice";
import AddBatchStudentFormWrapper from "../Add/AddBatchStudentFormWrapper";
import { TableHeader } from "../../../../components/molecules/MOLTable/MOLTable";
import { AppDispatch, RootState } from "../../../../store";
import { formatedDateTimeIntoIst } from "../../../../utils/dateTimeFormat";
import { useSelector, useDispatch } from "react-redux";
import { useGetAllStudentsQuery } from "../../service/StudentServices";
import { useParams } from "react-router-dom";
import { useFilterPagination } from "../../../../hooks/useFilterPagination";

type Props = {};
const tableHeaders: TableHeader<BatchStudent>[] = [
  {
    fieldName: "dateTime",
    headerName: "Date-Time",
    highlight: true,
    flex: "flex-[1_1_0%]",
    renderCell: (row) => (
      <div>
        <div className="font-medium text-slate-700">
          {formatedDateTimeIntoIst(row.dateTime, "DD MMM yyyy")}
        </div>
        <div className="text-[13px] font-medium text-slate-400">
          {formatedDateTimeIntoIst(row.dateTime, "hh:mm A")}
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
];

const BatchStudentListingWrapper = (props: Props) => {
  const { batchId } = useParams()
  const { isOpenAddDialog } = useSelector(
    (state: RootState) => state?.batchstudent
  );
  const dispatch = useDispatch<AppDispatch>();
  const { searchQuery, page, limit } = useFilterPagination()
  const [studentData, setStudentData] = useState<any>()
  const { data, isLoading, isFetching } = useGetAllStudentsQuery({
    body: {
      searchValue: searchQuery,
      limit: limit,
      params: [
        "name"
      ],
      page: page, 
      filterBy: [],
      dateFilter: {},
      orderBy: "createdAt",
      orderByValue: -1,
      isPaginationRequired: true
    },
    Id: batchId
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
