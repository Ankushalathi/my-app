
import { IconPlus } from "@tabler/icons-react";
import { BatchAssignment } from "../../models/BatchAssignment.model";
import MOLTable, { TableHeader } from "../../../../components/molecules/MOLTable/MOLTable";
import ATMPageHeader from "../../../../components/atoms/ATMPageHeader/ATMPageHeader";
import MOLFilterBar from "../../../../components/molecules/MOLFilterBar/MOLFilterBar";
import ATMPagination from "../../../../components/atoms/ATMPagination/ATMPagination";

type Props = {
  onAddNew: () => void;
  rowData: BatchAssignment[];
  tableHeaders: TableHeader<BatchAssignment>[];
  filterPaginationData: {
    totalCount: number;
    totalPages: number;
  };
};

const BatchAssignmentListing = ({
  onAddNew,
  tableHeaders,
  rowData,
  filterPaginationData: { totalCount, totalPages },
}: Props) => {
  return (
    <>
      <div className="flex flex-col h-full gap-2">
        <ATMPageHeader
          heading="BatchAssignments"
          buttonProps={{
            label: "Add New",
            icon: IconPlus,
            onClick: onAddNew,
          }}
        />
        <div className="flex flex-col overflow-auto border rounded border-slate-300">
          {/* Table Toolbar */}
          <MOLFilterBar />

          <div className="flex-1 overflow-auto">
            <MOLTable<BatchAssignment>
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

export default BatchAssignmentListing;

