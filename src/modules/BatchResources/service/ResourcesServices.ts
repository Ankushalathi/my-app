import apiSlice from "../../../services/ApiSlice";

export const resourceApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // ADD
        addResource: builder.mutation({
            invalidatesTags: ["resource"],
            query: (body: any) => {
                return {
                    url: "resource/add/trainer",
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
                    url: "/trainer/resources",
                    method: "POST",
                    body,
                };
            },
        }),

        // EDIT
        EditResource: builder.mutation({
            invalidatesTags: ["resource"],
            query: ({ body, ResourceEditId }: any) => {
                return {
                    url: `/resource/${ResourceEditId}/trainer`,
                    method: "PUT",
                    body,
                };
            },
        }),

        //Single View
        getResourceById: builder.query({
            providesTags: ["resource"],
            query: (ResourceEditId: any) => {
                return {
                    url: `/resource/${ResourceEditId}/trainer`,
                    method: "GET",
                };
            },
        }),

        // DELETE
        deleteResources: builder.mutation({
            invalidatesTags: ["resource"],
            query: (resouresId) => {
                return {
                    url: `/resource/${resouresId}/trainer`,
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