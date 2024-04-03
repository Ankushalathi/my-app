import { useNavigate } from "react-router-dom";
import { TableHeader } from "../../../../components/molecules/MOLTable/MOLTable";
import { Batch } from "../../models/Batch.model";
import BatchListing from "./BatchListing";

type Props = {};
const listData: Batch[] = [
  {
    batchName: "MERN-MAR-24",
    course: "Full Stack Web Development-MERN",
    mode: "Online",
    startFrom: "2024-04-15",
    timings: "6:00 PM - 8:00 PM",
    language: "English",
    seats: "20",
    _id: "1",
  },
  {
    batchName: "MERN-MAR-23",
    course: "Full Stack Web Development-MERN",
    mode: "Offline",
    startFrom: "2024-05-01",
    timings: "10:00 AM - 12:00 PM",
    language: "English",
    seats: "15",
    _id: "2",
  },
  {
    batchName: "MERN-JUNE-24",
    course: "Full Stack Web Development-MERN",
    mode: "Classroom",
    startFrom: "2024-04-20",
    timings: "7:00 PM - 9:00 PM",
    language: "English",
    seats: "25",
    _id: "3",
  },
];

const tableHeaders: TableHeader<Batch>[] = [
  {
    fieldName: "batchName",
    headerName: "Batch name",
    flex: "flex-[1_1_0%]",
  },
  {
    fieldName: "course",
    headerName: "course",
    flex: "flex-[1_1_0%]",
  },
  {
    fieldName: "mode",
    headerName: "mode",
    flex: "flex-[1_1_0%]",
  },
  {
    fieldName: "startFrom",
    headerName: "start from",
    flex: "flex-[1_1_0%]",
  },
  {
    fieldName: "timings",
    headerName: "timings",
    flex: "flex-[1_0_0%]",
  },
  {
    fieldName: "language",
    headerName: "language",
    flex: "flex-[1_1_0%]",
  },
  {
    fieldName: "seats",
    headerName: "seats",
    flex: "flex-[1_1_0%]",
  },
];

const BathcListingWrapper = (props: Props) => {
  const navigate = useNavigate()
  return (
    <>
      <BatchListing
        tableHeaders={tableHeaders}
        rowData={listData}
        filterPaginationData={{
          totalCount: 100,
          totalPages: 5,

        }} onRowClick={(row) => navigate(`/batch/view/${row?._id}`)}
      />
    </>
  );
};

export default BathcListingWrapper;
