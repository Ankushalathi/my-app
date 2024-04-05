import apiSlice from "../../../../services/ApiSlice";

export const assignmentApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Get All students
        getAllAssignment: builder.query({
            providesTags: ["assignment"],
            query: ({ Id, body }) => {
                return {
                    url: `assignment/batch/${Id}/get-batch-assignments/trainer`,
                    method: "POST",
                    body,
                };
            },
        }),
        addAssignment: builder.mutation({
            invalidatesTags: ["assignment"],
            query: ({ body }) => {
                return {
                    url: "/question/trainer",
                    method: "POST",
                    body,
                };
            },
        }),
        getAllQuestions: builder.query({
            providesTags: ["assignment"],
            query: ({ body }) => {
                return {
                    url: "/question/trainer",
                    method: "POST",
                    body,
                };
            },
        }),
        getAlltag: builder.query({
            providesTags: ["assignment"],
            query: ({ body }) => {
                return {
                    url: "/tag/trainer",
                    method: "POST",
                    body,
                };
            },
        }),
        addAssignmentQuestions: builder.mutation({
            invalidatesTags: ["assignment"],
            query: ({ batchId, questionId, assignstatus, body }) => {
                return {
                    url: `batch/${batchId}/question/${questionId}/assign/${assignstatus}/trainer`,
                    method: "PUT",
                    body,
                };
            },
        }),
    }),

});

export const { useGetAllAssignmentQuery, useAddAssignmentMutation, useGetAlltagQuery, useAddAssignmentQuestionsMutation, useGetAllQuestionsQuery } = assignmentApi;
