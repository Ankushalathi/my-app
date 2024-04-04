
import React from "react";
import BatchAssignmentListing from "./BatchAssignmentListing";
import { BatchAssignment } from "../../models/BatchAssignment.model";
import { useDispatch, useSelector } from "react-redux";
import { setIsOpenAddDialog } from "../../slice/BatchAssignmentSlice";
import AddBatchAssignmentFormWrapper from "../Add/AddBatchAssignmentFormWrapper";
import { AppDispatch, RootState } from "../../../../store";
import { TableHeader } from "../../../../components/molecules/MOLTable/MOLTable";
import { useParams } from "react-router-dom";
import { useFilterPagination } from "../../../../hooks/useFilterPagination";
import { useGetAllAssignmentQuery } from "../Services/AssignmentServices";

type Props = {};

// TODO
// const listData: BatchAssignment[] = [
//   {
//     name: "Vishal",
//     age: 26,
//     email: "samyak@gmail.com",
//     amount: 20000,
//     _id: "1",
//   },
//   {
//     name: "Vikas",
//     age: 24,
//     email: "vikas",
//     amount: 5000,
//     _id: "2",
//   },
//   {
//     name: "Samyak",
//     age: 22,
//     email: "samyak",
//     amount: 10000,
//     _id: "3",
//   },
//   {
//     name: "Jaya",
//     age: 22,
//     email: "samyak",
//     amount: 8000,
//     _id: "4",
//   },
//   {
//     name: "Siya",
//     age: 22,
//     email: "samyak",
//     amount: 18000,
//     _id: "5",
//   },
// ];

const tableHeaders: TableHeader<BatchAssignment>[] = [
  {
    fieldName: "name",
    headerName: "Name",
    highlight: true,
    flex: "flex-[1_1_0%]",
    stopPropagation: true,
  },
  {
    fieldName: "age",
    headerName: "Age",
    flex: "flex-[1_0_0%]",
  },
  {
    fieldName: "amount",
    headerName: "Fees",
    flex: "flex-[1_0_0%]",
  },
  {
    fieldName: "email",
    headerName: "Email",
    extraClasses: () => "min-w-[100px]",
    flex: "flex-[1_0_0%]",
  },
];

const BatchAssignmentListingWrapper = (props: Props) => {
  const { isOpenAddDialog } = useSelector((state: RootState) => state?.batchassignment);
  const dispatch = useDispatch<AppDispatch>();
  const { batchId } = useParams()
  const { searchQuery, page, limit } = useFilterPagination()
  const { data: assignment } = useGetAllAssignmentQuery({
    body: {
      searchValue: searchQuery,
      params: [
        "questionLabel",
        "studentLabel",
        "remark",
        "batchLabel",
        "modulelabel",
        "chapterLabel",
        "complexity",
        "questionTags._id"
      ],
      limit: limit,
      page: page,
      "filterBy": [
        {
          "fieldName": "",
          "value": ""
        }
      ],
      dateFilter: {},
      orderBy: "createdAt",
      orderByValue: -1,
      isPaginationRequired: false
    },
    Id: batchId
  })

  return (
    <>
      <BatchAssignmentListing
        tableHeaders={tableHeaders}
        rowData={assignment}
        onAddNew={() => dispatch(setIsOpenAddDialog(true))}
        filterPaginationData={{
          totalCount: 100,
          totalPages: 5,
        }}
      />

      {isOpenAddDialog && (
        <AddBatchAssignmentFormWrapper
          onClose={() => dispatch(setIsOpenAddDialog(false))}
        />
      )}
    </>
  );
};

export default BatchAssignmentListingWrapper;

