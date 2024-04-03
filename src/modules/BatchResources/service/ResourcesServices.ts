import apiSlice from "../../../services/ApiSlice";

export const resourceApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // ADD
        addResource: builder.mutation({
            invalidatesTags: ["resource"],
            query: (body: any) => {
                return {
                    url: "trainer/add-resource",
                    method: "POST",
                    body,
                };
            },
        }),
        // GET
        getAllResources: builder.query({
            providesTags: ["resource"],
            query: (body) => {
                return {
                    url: "/account/",
                    method: "POST",
                    body,
                };
            },
        }),

        // EDIT
        editResource: builder.mutation({
            invalidatesTags: ["resource"],
            query: ({ body, EditId }: any) => {
                return {
                    url: `/account/${EditId}`,
                    method: "PUT",
                    body,
                };
            },
        }),

        //Single View
        getResourceById: builder.query({
            providesTags: ["resource"],
            query: (EditId: any) => {
                return {
                    url: `/account/${EditId}`,
                    method: "GET",
                };
            },
        }),

        // DELETE
        deleteResources: builder.mutation({
            invalidatesTags: ["resource"],
            query: ({ resouresId }) => {
                return {
                    url: `/resource/${resouresId}`,
                    method: "DELETE",
                };
            },
        }),
    }),
});

export const {
    useAddResourceMutation,
    useGetAllResourcesQuery,
    useEditResourceMutation,
    useGetResourceByIdQuery,
    useDeleteResourcesMutation
} = resourceApi;