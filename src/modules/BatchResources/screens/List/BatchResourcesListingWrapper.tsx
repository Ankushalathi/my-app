
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddBatchResourcesFormWrapper from "../Add/AddBatchResourcesFormWrapper";
import { TableHeader } from "../../../../components/molecules/MOLTable/MOLTable";
import { AppDispatch, RootState } from "../../../../store";
import { useDeleteResourcesMutation, useGetAllResourcesQuery } from "../../service/ResourcesServices";
import { showToast } from "../../../../utils/showToaster";
import BatchResourcesListing from "./BatchResourcesListing";
import { BatchResources } from "../../models/BatchResources.model";
import { setIsOpenAddDialog } from "../../slice/BatchResourcesSlice";
import EditBatchResourcesFormWrapper from "../Edit/EditBatchResourcesFormWrapper";
import { showConfirmationDialog } from "../../utils/showConfirmationDialog ";
import { useFetchData } from "../../../../hooks/useFetchData";
import { useFilterPagination } from "../../../../hooks/useFilterPagination";

type Props = {
};

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

  const [ResourceEditId, setResourceEditId] = useState("")

  const { isOpenAddDialog } = useSelector((state: RootState) => state?.batchresources);
  const [deleteResource] = useDeleteResourcesMutation();
  const { searchQuery, page, limit } = useFilterPagination();
  const { data, totalData, totalPages } = useFetchData(
    useGetAllResourcesQuery,
    {
      body: {
        limit: limit,
        searchValue: searchQuery,
        page: page,
        isPaginationRequired: true
      },
    }
  );

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
          setResourceEditId(resouresId)

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
        rowData={data as any[]}
        onAddNew={() => dispatch(setIsOpenAddDialog(true))}
        filterPaginationData={{
          totalCount: totalData,
          totalPages: totalPages,
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
          ResourceEditId={ResourceEditId}
          
        />
      )}
    </>
  );
};

export default BatchResourcesListingWrapper;

