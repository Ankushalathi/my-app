import React, { useEffect, useState } from "react";
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
import CustomDialog from "../Dialog/CustomDialog ";

type Props = {};

const tableHeaders: TableHeader<BatchAssignment>[] = [
  {
    fieldName: "questionTitle",
    headerName: "question Title",
    flex: "flex-[1_1_0%]",
  },
  {
    fieldName: "complexity",
    headerName: "complexity",
    flex: "flex-[1_0_0%]",
  },
  {
    fieldName: "totalStudentDoneAssignment",
    headerName: "TOTAL STUDENT DONE",
    flex: "flex-[1_0_0%]",
  },
  {
    fieldName: "totalStudents",
    headerName: "TOTAL STUDENTS",
    flex: "flex-[1_0_0%]",
  }
];

const BatchAssignmentListingWrapper = (props: Props) => {
  const { isOpenAddDialog } = useSelector((state: RootState) => state?.batchassignment);
  const dispatch = useDispatch<AppDispatch>();
  const [assignmentData, setAssignmentData] = useState<any>()
  const [solutionData , setSolutionData] = useState<any>()
  const [isDialogOpen, setsDialogOpen] = useState(false)
  const { batchId } = useParams()
  const { searchQuery, page, limit } = useFilterPagination()
  const { data, isLoading, isFetching } = useGetAllAssignmentQuery({
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
  useEffect(() => {
    if (!isLoading && !isFetching) {
      setAssignmentData(data?.data)
    }
  }, [data, isLoading, isFetching])

  return (
    <>
      <BatchAssignmentListing 
       isLoading ={isFetching || isLoading }
        tableHeaders={tableHeaders}
        rowData={assignmentData}
        onAddNew={() => dispatch(setIsOpenAddDialog(true))}
        filterPaginationData={{
          totalCount: 100,
          totalPages: 5,
        }}
        onRowClick={(row:any) =>{
          setSolutionData(row) 
           setsDialogOpen(true)
        }
           }
      />

      {isOpenAddDialog && (
        <AddBatchAssignmentFormWrapper
          onClose={() => dispatch(setIsOpenAddDialog(false))}
          batchData={assignmentData}
        />
      )}
      {

        isDialogOpen &&(
          <CustomDialog
          solutionData={solutionData}
          onClose={()=>setsDialogOpen(false)}
          />
        )
      }
    </>
  );
};

export default BatchAssignmentListingWrapper;
