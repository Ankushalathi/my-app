import { TableHeader } from "../../../components/molecules/MOLTable/MOLTable";
import { useFetchData } from "../../../hooks/useFetchData";
import { useFilterPagination } from "../../../hooks/useFilterPagination";
import { formatedDateTimeIntoIst } from "../../../utils/dateTimeFormat";
import { Batch } from "../models/Batch.model";
import { useGetAllBatchesQuery } from "../services/BatchServices";
import BatchListing from "./BatchListing";

type Props = {};

const tableHeaders: TableHeader<Batch>[] = [
  {
    fieldName: "batchName",
    headerName: "Batch name",
    flex: "flex-[1_1_0%]",
    stopPropagation: true,
  },
  {
    fieldName: "courseName",
    headerName: "course",
    flex: "flex-[1_1_0%]",
    stopPropagation: true,
  },
  {
    fieldName: "modeName",
    headerName: "mode",
    flex: "flex-[1_1_0%]",
    stopPropagation: true,
  },
  {
    fieldName: "startDate",
    headerName: "start from",
    flex: "flex-[1_1_0%]",
    renderCell: (row) => formatedDateTimeIntoIst(row?.startDate || "" , 'DD MMM yyyy'),
  },
  {
    fieldName: "time",
    headerName: "timings",
    flex: "flex-[1_0_0%]",
  },
  {
    fieldName: "language",
    headerName: "language",
    flex: "flex-[1_1_0%]",
  },
  {
    fieldName: "noOfSeats",
    headerName: "seats",
    flex: "flex-[1_1_0%]",
  },
];

const BathcListingWrapper = (props: Props) => {
  const { searchQuery, page, limit } = useFilterPagination();
  const { data, isLoading, totalPages, totalData } = useFetchData(
    useGetAllBatchesQuery,
    {
      body: {
        limit: limit,
        searchValue: searchQuery,
        params: ["trainers"],
        page: page,
        filterBy: [],
        dateFilter: {},
        orderBy: "createdAt",
        orderByValue: -1,
        isPaginationRequired: true,
      },
    }
  );

  return (
    <>
      <BatchListing
        tableHeaders={tableHeaders}
        rowData={data}
        filterPaginationData={{
          totalCount: totalData,
          totalPages,
        }}
        isTableLoading={isLoading}
      />
    </>
  );
};

export default BathcListingWrapper;
