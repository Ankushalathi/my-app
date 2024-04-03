import apiSlice from "./ApiSlice";
import { v4 as uuid } from "uuid";

const deviceId = localStorage.getItem("deviceId") || uuid();

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Login
    login: builder.mutation({
      query: (body: { email: string; password: string }) => {
        return {
          url: "/trainer/login",
          method: "POST",
          headers: {
            "device-id": deviceId,
          },
          body,
        };
      },
      transformResponse: (response: any) => {
        return { ...response, data: { ...response?.data, deviceId } };
      },
    }),

    getUser: builder.query({
      query: () => {
        return {
          url: `/trainer/${localStorage.getItem("userId")}`,
          method: "GET",
        };
      },
      // transformResponse: (response: any) => {
      //   return { ...response, data: { ...response?.data, deviceId } };
      // },
    }),

    // Get Access Token
    getAccessToken: builder.mutation({
      query: (body) => {
        return {
          url: "/admin/refresh",
          method: "POST",
          headers: {
            "device-id": deviceId,
          },
          body,
        };
      },
    }),

    // Change Password
    changePassword: builder.mutation({
      query: (body) => {
        return {
          url: "/user/change-password",
          method: "PUT",
          headers: {
            "device-id": deviceId,
          },
          body,
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useGetAccessTokenMutation,
  useChangePasswordMutation,
  useGetUserQuery,
} = authApi;
