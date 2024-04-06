import apiSlice from "../../../services/ApiSlice";

export const studentApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Get All students
        getAllStudents: builder.query({
            query: ({ Id, body }) => {
                return {
                    url: `/trainer/batch/${Id}/students`,
                    method: "POST",
                    body,
                };
            },
        }),
    }),
});

export const { useGetAllStudentsQuery } = studentApi;
