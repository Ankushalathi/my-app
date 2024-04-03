import ATMPageHeader from "../../../../components/atoms/ATMPageHeader/ATMPageHeader";
import ATMPagination from "../../../../components/atoms/ATMPagination/ATMPagination";
import MOLFilterBar from "../../../../components/molecules/MOLFilterBar/MOLFilterBar";
import MOLTable, {
  TableHeader,
} from "../../../../components/molecules/MOLTable/MOLTable";
import { Batch } from "../../models/Batch.model";

type Props = {
  rowData: Batch[];
  tableHeaders: TableHeader<Batch>[];
  filterPaginationData: {
    totalCount: number;
    totalPages: number;
  };
  onRowClick: (row: Batch) => void;
  isTableLoading: boolean;
};

const BatchListing = ({
  tableHeaders,
  rowData,
  filterPaginationData: { totalCount, totalPages },
  onRowClick,
  isTableLoading = true,
}: Props) => {
  return (
    <>
      <div className="flex flex-col h-full gap-2">
        <ATMPageHeader heading="Batches" hideButton />
        <div className="flex flex-col overflow-auto border rounded border-slate-300">
          {/* Table Toolbar */}
          <MOLFilterBar />

          <div className="flex-1 overflow-auto">
            <MOLTable<Batch>
              tableHeaders={tableHeaders}
              data={rowData}
              getKey={(item) => item?._id}
              onRowClick={onRowClick}
              isLoading={isTableLoading}
            />
          </div>

          {/* Pagination */}
          <ATMPagination
            totalPages={totalPages}
            rowCount={totalCount}
            rows={rowData}
          />
        </div>
      </div>
    </>
  );
};

export default BatchListing;
