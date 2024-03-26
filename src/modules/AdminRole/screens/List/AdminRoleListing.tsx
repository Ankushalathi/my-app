import { IconPlus } from "@tabler/icons-react";
import { AdminRole } from "../../models/AdminRole.model";
import MOLTable, {
  TableHeader,
} from "../../../../components/molecules/MOLTable/MOLTable";
import ATMPageHeader from "../../../../components/atoms/ATMPageHeader/ATMPageHeader";
import Authorization from "../../../../components/Authorization/Authorization";
import MOLFilterBar from "../../../../components/molecules/MOLFilterBar/MOLFilterBar";
import { isAuthorized } from "../../../../utils/authorization";
import ATMPagination from "../../../../components/atoms/ATMPagination/ATMPagination";

type Props = {
  onAddNew: () => void;
  rowData: AdminRole[];
  onEdit: (item: any) => void;
  tableHeaders: TableHeader<AdminRole>[];
  filterPaginationData: {
    totalCount: number;
    totalPages: number;
  };
  isTableLoading: boolean;
};

const AdminRoleListing = ({
  onAddNew,
  tableHeaders,
  rowData,
  onEdit,
  filterPaginationData: { totalCount, totalPages },
  isTableLoading,
}: Props) => {
  return (
    <>
      <div className="flex flex-col h-full gap-2">
        <ATMPageHeader
          heading="Admin Roles"
          buttonProps={{
            label: "Add New",
            icon: IconPlus,
            onClick: onAddNew,
          }}
          hideButton={!isAuthorized("ADMIN_ROLE_ADD")}
        />
        <Authorization permission="ADMIN_ROLE_LIST">
          <div className="flex flex-col overflow-auto border rounded border-slate-300">
            {/* Table Toolbar */}
            <MOLFilterBar />

            <div className="flex-1 overflow-auto">
              <MOLTable<AdminRole>
                tableHeaders={tableHeaders}
                data={rowData}
                getKey={(item) => item?._id}
                onEdit={isAuthorized("ADMIN_ROLE_UPDATE") ? onEdit : undefined}
                isLoading={isTableLoading}
                noDataMessage={`We couldn't find any match for "Admin Roles"`}
              />
            </div>

            {/* Pagination */}
            <ATMPagination
              totalPages={totalPages}
              rowCount={totalCount}
              rows={rowData}
            />
          </div>
        </Authorization>
      </div>
    </>
  );
};

export default AdminRoleListing;
