import { useNavigate } from "react-router-dom";
import { AdminRole } from "../../models/AdminRole.model";
import AdminRoleListing from "./AdminRoleListing";
import { useGetAdminRolesQuery } from "../../service/AdminRoleServices";
import { TableHeader } from "../../../../components/molecules/MOLTable/MOLTable";
import { useFilterPagination } from "../../../../hooks/useFilterPagination";
import { useFetchData } from "../../../../hooks/useFetchData";

type Props = {
  adminRoleId?: string;
};

const tableHeaders: TableHeader<AdminRole>[] = [
  {
    fieldName: "roleName",
    headerName: "Role Name",
    flex: "flex-[1_1_0%]",
    stopPropagation: true,
  },
];

const AdminRoleListingWrapper = (props: Props) => {
  const navigate = useNavigate();
  const { searchQuery, limit, page } = useFilterPagination();

  const { data, isLoading, totalData, totalPages } = useFetchData(
    useGetAdminRolesQuery,
    {
      body: {
        searchValue: searchQuery,
        limit,
        page,
      },
    }
  );

  return (
    <>
      <AdminRoleListing
        tableHeaders={tableHeaders}
        rowData={data as any[]}
        onAddNew={() => navigate("/admin-role/add-admin-role")}
        filterPaginationData={{
          totalCount: totalData,
          totalPages,
        }}
        onEdit={(item) => navigate(item._id)}
        isTableLoading={isLoading}
      />
    </>
  );
};
export default AdminRoleListingWrapper;
