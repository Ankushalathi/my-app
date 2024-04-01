const sliceTemplate = `
import { Slice, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { SliceStateType } from "src/models/SliceStateType";

const initialState: SliceStateType = {
  isOpenAddDialog: false,
  isOpenEditDialog: false,
};

const __SLICE_NAME__Slice: Slice<SliceStateType> = createSlice({
  name: "__SLICE_NAME__",
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

export const { setIsOpenAddDialog, setIsOpenEditDialog } = __SLICE_NAME__Slice.actions;
export default __SLICE_NAME__Slice.reducer;

`;

const getSliceTemplate = (moduleName) => {
  const sliceName = moduleName.toLowerCase();
  return sliceTemplate.replaceAll("__SLICE_NAME__", sliceName);
};

module.exports = { sliceTemplate, getSliceTemplate };
