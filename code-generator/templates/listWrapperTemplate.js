const listWrapperTemplate = `
import React from "react";
import __MODULE_NAME__Listing from "./__MODULE_NAME__Listing";
import { __MODULE_NAME__ } from "../../models/__MODULE_NAME__.model";
import { TableHeader } from "src/components/molecules/MOLTable/MOLTable";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/store";
import { setIsOpenAddDialog } from "../../slice/__MODULE_NAME__Slice";
import Add__MODULE_NAME__FormWrapper from "../Add/Add__MODULE_NAME__FormWrapper";

type Props = {};

const listData: __MODULE_NAME__[] = [
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

const tableHeaders: TableHeader<__MODULE_NAME__>[] = [
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

const __MODULE_NAME__ListingWrapper = (props: Props) => {
  const { isOpenAddDialog } = useSelector((state: RootState) => state?.__SLICE_NAME__);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <__MODULE_NAME__Listing
        tableHeaders={tableHeaders}
        rowData={listData}
        onAddNew={() => dispatch(setIsOpenAddDialog(true))}
        filterPaginationData={{
          totalCount: 100,
          totalPages: 5,
        }}
      />

      {isOpenAddDialog && (
        <Add__MODULE_NAME__FormWrapper
          onClose={() => dispatch(setIsOpenAddDialog(false))}
        />
      )}
    </>
  );
};

export default __MODULE_NAME__ListingWrapper;

`;

const getListWrapperTemplate = (moduleName) => {
  const sliceName = moduleName.toLowerCase();

  let result = listWrapperTemplate.replaceAll("__MODULE_NAME__", moduleName);
  result = result.replaceAll("__SLICE_NAME__", sliceName);
  return result;
};

module.exports = { listWrapperTemplate, getListWrapperTemplate };
