
import { Slice, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { SliceStateType } from "../../../models/SliceStateType";

const initialState: SliceStateType = {
  isOpenAddDialog: false,
  isOpenEditDialog: false,
};

const batchassignmentSlice: Slice<SliceStateType> = createSlice({
  name: "batchassignment",
  initialState,
  reducers: {
    setIsOpenAddDialog: (state, action: PayloadAction<boolean>) => {
      state.isOpenAddDialog = action.payload;
    },
    setIsOpenEditDialog: (state, action: PayloadAction<boolean>) => {
      state.isOpenEditDialog = action.payload;
    },
  },
});

export const { setIsOpenAddDialog, setIsOpenEditDialog } = batchassignmentSlice.actions;
export default batchassignmentSlice.reducer;

