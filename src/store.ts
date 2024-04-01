import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./slices/AuthSlice";
import SideNavLayoutSlice from "./slices/SideNavLayoutSlice";
import apiSlice from "./services/ApiSlice";
import { fileExplorerSlice } from "./services/FileExplorer";
import { authMiddleware } from "./middlewares/authMiddleware";
import { setupListeners } from "@reduxjs/toolkit/query";
import BatchSlice from "./modules/Batch/slice/BatchSlice";

import AttendanceSlice from "./modules/Attendance/slice/AttendanceSlice";
// Import New Slice Above

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    sideNavLayout: SideNavLayoutSlice,
    batch:BatchSlice,
    attendance: AttendanceSlice,
    // Add More Slice Above

    [apiSlice.reducerPath]: apiSlice.reducer,
    [fileExplorerSlice.reducerPath]: fileExplorerSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([
      authMiddleware,
      apiSlice.middleware,
      fileExplorerSlice.middleware,
    ]),
});

setupListeners(store.dispatch);
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
