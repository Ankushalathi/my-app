import { useNavigate } from "react-router-dom";
import BatchListing from "./BatchListing";
import { TableHeader } from "../../../../components/molecules/MOLTable/MOLTable";
import { Batch } from "../../models/Batch.model";
import { formatedDateTimeIntoIst } from "../../../../utils/dateTimeFormat";
import { useFilterPagination } from "../../../../hooks/useFilterPagination";
import { useFetchData } from "../../../../hooks/useFetchData";
import { useGetAllBatchesQuery } from "../../services/BatchServices";

type Props = {};

const tableHeaders: TableHeader<Batch>[] = [
  {
    fieldName: "batchName",
    headerName: "Batch name",
    flex: "flex-[1_1_0%]",
  },
  {
    fieldName: "courseName",
    headerName: "course",
    flex: "flex-[1_1_0%]",
  },
  {
    fieldName: "modeName",
    headerName: "mode",
    flex: "flex-[1_1_0%]",
  },
  {
    fieldName: "startDate",
    headerName: "start from",
    flex: "flex-[1_1_0%]",
    renderCell: (row) =>
      formatedDateTimeIntoIst(row?.startDate || "", "DD MMM yyyy"),
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
  const navigate = useNavigate();
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
          totalPages: totalPages,
        }}
        onRowClick={(row) => navigate(`/batch/view/${row?._id}`)}
        isTableLoading={isLoading}
      />
    </>
  );
};

export default BathcListingWrapper;
