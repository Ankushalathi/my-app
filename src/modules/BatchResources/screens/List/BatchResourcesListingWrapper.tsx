
import React, { useState } from "react";
import BatchResourcesListing from "./BatchResourcesListing";
import { BatchResources } from "../../models/BatchResources.model";
import { useDispatch, useSelector } from "react-redux";
import { setIsOpenAddDialog } from "../../slice/BatchResourcesSlice";
import AddBatchResourcesFormWrapper from "../Add/AddBatchResourcesFormWrapper";
import { TableHeader } from "../../../../components/molecules/MOLTable/MOLTable";
import { AppDispatch, RootState } from "../../../../store";
import EditBatchResourcesFormWrapper from "../Edit/EditBatchResourcesFormWrapper";
import { showConfirmationDialog } from "../../utils/showConfirmationDialog ";
import { useDeleteResourcesMutation } from "../../service/ResourcesServices";
import { showToast } from "../../../../utils/showToaster";

type Props = {};

const listData: BatchResources[] = [
  {
    name: "Vishal",
    age: 26,
    email: "samyak@gmail.com",
    amount: 20000,
    _id: "1",
  },
  {
    name: "Vikas",
    age: 24,
    email: "vikas",
    amount: 5000000000,
    _id: "2",
  },
  {
    name: "Samyak",
    age: 22,
    email: "samyak",
    amount: 10000,
    _id: "3",
  },
  {
    name: "Jaya",
    age: 22,
    email: "samyak",
    amount: 8000,
    _id: "4",
  },
  {
    name: "Siya",
    age: 22,
    email: "samyak",
    amount: 18000,
    _id: "5",
  },
];

const tableHeaders: TableHeader<BatchResources>[] = [
  {
    fieldName: "name",
    headerName: "Name",
    sortable: true,
    sortKey: "name",
    highlight: true,
    flex: "flex-[1_1_0%]",
    stopPropagation: true,
  },
  {
    fieldName: "age",
    headerName: "Age",
    sortable: true,
    sortKey: "age",
    flex: "flex-[1_0_0%]",
  },
  {
    fieldName: "amount",
    headerName: "Fees",
    sortable: true,
    sortKey: "amount",
    flex: "flex-[1_0_0%]",
    align: "end",
  },
  {
    fieldName: "email",
    headerName: "Email",
    extraClasses: () => "min-w-[100px]",
    flex: "flex-[1_0_0%]",
  },
];

const BatchResourcesListingWrapper = (props: Props) => {
  const { isOpenAddDialog } = useSelector((state: RootState) => state?.batchresources);
  const [deleteResource] = useDeleteResourcesMutation();

  const [isOpenEditForm, setIsOpenEditForm] = useState(false)

  const dispatch = useDispatch<AppDispatch>();

  const getActionOptions = (resouresId: string) => {
    return [
      {
        label: (
          <div className="flex items-center gap-2 text-secondary-main">
            Edit
          </div>
        ),
        onClick: () => {
          setIsOpenEditForm(true);
        },

      },
      {
        label: (
          <div className="flex items-center gap-2 font-semibold text-red-600">
            Delete
          </div>
        ),
        onClick: () => {
          showConfirmationDialog({
            title: "Heads Up",
            text: "Are you sure want to Delete this Resource ?",
            icon: "question",
            showCancelButton: true,
            next: (result) => {
              if (result?.isConfirmed) {
                deleteResource({ resouresId }).then((res: any) => {
                  if (res?.error) {
                    showToast("error", res?.error?.data?.message);
                  } else {
                    if (res?.data?.status) {
                      showToast("success", res?.data?.message);
                    } else {
                      showToast("error", res?.data?.message);
                    }
                  }
                });
              }
            },
          });
        },

      },
    ];
  };

  return (
    <>
      <BatchResourcesListing
        tableHeaders={tableHeaders}
        getActionOptions={getActionOptions}
        rowData={listData}
        onAddNew={() => dispatch(setIsOpenAddDialog(true))}
        filterPaginationData={{
          totalCount: 100,
          totalPages: 5,
        }}
      />

      {isOpenAddDialog && (
        <AddBatchResourcesFormWrapper
          onClose={() => dispatch(setIsOpenAddDialog(false))}
        />
      )}
      {isOpenEditForm && (
        <EditBatchResourcesFormWrapper
          onClose={() => (setIsOpenEditForm(false))}
          categoryId=""
        />
      )}
    </>
  );
};

export default BatchResourcesListingWrapper;

