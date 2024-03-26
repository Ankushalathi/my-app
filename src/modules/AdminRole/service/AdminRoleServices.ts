import apiSlice from "../../../services/ApiSlice";

export const adminRoleApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET
    getAdminRoles: builder.query({
      providesTags: ["admin-roles"],
      query: (body) => {
        return {
          url: "user-role",
          method: "POST",
          body,
        };
      },
    }),

    // GET Roles Of an Admin
    getRolesOfAnAdmin: builder.query({
      providesTags: ["admin-roles"],
      query: () => {
        return {
          url: "user-role/users-all-module",
          method: "GET",
        };
      },
    }),

    // ADD
    addAdminRole: builder.mutation({
      invalidatesTags: ["admin-roles"],
      query: (body) => {
        return {
          url: "user-role/add",
          method: "POST",
          body,
        };
      },
    }),
    // Update Admin role
    updateAdminRole: builder.mutation({
      invalidatesTags: ["admin-role", "admin-roles"],
      query: ({ body, adminRoleId }) => {
        return {
          url: `user-role/${adminRoleId}`,
          method: "PUT",
          body,
        };
      },
    }),
    // Get Admin Role
    getAdminRole: builder.query({
      providesTags: ["admin-role"],
      query: (adminRoleId) => {
        return {
          url: `user-role/${adminRoleId}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useGetAdminRolesQuery,
  useAddAdminRoleMutation,
  useGetRolesOfAnAdminQuery,
  useGetAdminRoleQuery,
  useUpdateAdminRoleMutation,
} = adminRoleApi;
