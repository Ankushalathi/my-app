import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/constants/index";

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}`,

    prepareHeaders: (headers, { getState, endpoint }) => {
      const token = (getState() as any)?.auth?.accessToken;

      if (token && endpoint !== "getAccessModules") {
        headers.set("x-access-token", token);
      }
      return headers;
    },
  }),
  tagTypes: [
    "states",
    "state",
    "cities",
    "city",
    "mandis",
    "mandi",
    "categories",
    "category",
    "admin-roles",
    "admin-role",
    "admin-users",
    "admin-user",
    "subCategories",
    "subCategory",
    "sellers",
    "seller",
    "products",
    "product",
    "inventory"
  ],
  endpoints: () => ({}),
});

export default apiSlice;
