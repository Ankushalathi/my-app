import apiSlice from "../../../services/ApiSlice";

export const attendanceService = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // GET
     getAllStudentAttendanceCount: builder.query({
        query: (body: any) => {
          return {
            url: "/attendance/get-attendance-count/trainer ",
            method: "POST",
            body,
          };
        },
      }), 

      // get All student in batch
    getAllStudentOfBatch: builder.query({
        query: (body) => {
          return {
            url: "/attendance/trainer",
            method: "POST",
            body,
          };
        },
      }),
        //Update their attendance
    updateAttendance: builder.mutation({
        query: (body) => {
          return {
            url: `/attendance/update-student-status/trainer`,
            method: "PUT",
            body, 
          };
        },
      }),
    }),
});

export const {
    useGetAllStudentAttendanceCountQuery ,
     useGetAllStudentOfBatchQuery ,
     useUpdateAttendanceMutation
} = attendanceService;