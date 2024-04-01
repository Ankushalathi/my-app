import { BatchStudent } from "../../models/BatchStudent.model";
import ATMPageHeader from "../../../../components/atoms/ATMPageHeader/ATMPageHeader";
import ATMPagination from "../../../../components/atoms/ATMPagination/ATMPagination";
import MOLTable, { TableHeader } from "../../../../components/molecules/MOLTable/MOLTable";
import MOLFilterBar from "../../../../components/molecules/MOLFilterBar/MOLFilterBar";

type Props = {
  rowData: BatchStudent[];
  tableHeaders: TableHeader<BatchStudent>[];
  filterPaginationData: {
    totalCount: number;
    totalPages: number;
  };
};

const BatchStudentListing = ({
  tableHeaders,
  rowData,  
  filterPaginationData: { totalCount, totalPages },
}: Props) => {
  return (
    <>
      <div className="flex flex-col h-full gap-2">
        <ATMPageHeader
          hideButton
          heading="Students"
        />
        <div className="flex flex-col overflow-auto border rounded border-slate-300">
          {/* Table Toolbar */}
          <MOLFilterBar />

          <div className="flex-1 overflow-auto">
            <MOLTable<BatchStudent>
              tableHeaders={tableHeaders}
              data={rowData}
              getKey={(item) => item?._id}
              onEdit={(item) => alert(item?.name)}
              onDelete={(item) => alert(item?.name)}
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

export default BatchStudentListing;

