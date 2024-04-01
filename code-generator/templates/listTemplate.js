const listTemplate = `
import { IconPlus } from "@tabler/icons-react";
import ATMPageHeader from "src/components/atoms/ATMPageHeader/ATMPageHeader";
import ATMPagination from "src/components/atoms/ATMPagination/ATMPagination";
import MOLFilterBar from "src/components/molecules/MOLFilterBar/MOLFilterBar";
import MOLTable, {
  TableHeader,
} from "src/components/molecules/MOLTable/MOLTable";
import { __MODULE_NAME__ } from "../../models/__MODULE_NAME__.model";

type Props = {
  onAddNew: () => void;
  rowData: __MODULE_NAME__[];
  tableHeaders: TableHeader<__MODULE_NAME__>[];
  filterPaginationData: {
    totalCount: number;
    totalPages: number;
  };
};

const __MODULE_NAME__Listing = ({
  onAddNew,
  tableHeaders,
  rowData,
  filterPaginationData: { totalCount, totalPages },
}: Props) => {
  return (
    <>
      <div className="flex flex-col h-full gap-2">
        <ATMPageHeader
          heading="__MODULE_NAME__s"
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
            <MOLTable<__MODULE_NAME__>
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

export default __MODULE_NAME__Listing;

`;

const getListTemplate = (moduleName) => {
  return listTemplate.replaceAll("__MODULE_NAME__", moduleName);
};

module.exports = { listTemplate, getListTemplate };
