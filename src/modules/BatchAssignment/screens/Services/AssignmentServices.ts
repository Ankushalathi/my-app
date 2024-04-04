import apiSlice from "../../../../services/ApiSlice";

export const assignmentApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Get All students
        getAllAssignment: builder.query({
            query: ({ Id, body }) => {
                return {
                    url: `assignment/batch/${Id}/get-batch-assignments/trainer`,
                    method: "POST",
                    body,
                };
            },
        }),
    }),
});

export const { useGetAllAssignmentQuery } = assignmentApi;
