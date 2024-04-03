import apiSlice from "../../../services/ApiSlice";

export const batchApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get All Batches
    getAllBatches: builder.query({
      query: (body) => {
        return {
          url: "trainer/batches",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const { useGetAllBatchesQuery } = batchApi;
