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
          //Get all Assignments 
    getNotCompletedAssignmentsStudents: builder.query({
        query: (body: any) => {
          return {
            url: "/admission/incompleted-assignment-count/trainer",
            method: "POST",
            body,
          };
        },
      }),
    }),
});

export const { useGetAllStudentsQuery , useGetNotCompletedAssignmentsStudentsQuery } = studentApi;
