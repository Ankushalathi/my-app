
import { Slice, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { BatchSlceStateType } from "../models/BatchAssignment.model";

const initialState: BatchSlceStateType = {
  isOpenAddDialog: false,
  isOpenEditDialog: false,
  assignmentItems: [],
  totalItems: 0,
  isTableLoading: true,
  dialogPage: 1,
  dialogsearchValue: '',
  dialogTotalItems: 0,
  dialogItems: [],
  page: 1,
  rowsPerPage: 20,
  searchValue: "",
  sortValue: { field: "createdAt", value: "DESC" },
  filterBy: [
    {
      fieldName: "companyName",
      value: [],
    },
    {
      fieldName: "country",
      value: [],
    },
  ],
  dateFilter: {
    start_date: null,
    end_date: null,
  },
};

const batchassignmentSlice: Slice<BatchSlceStateType> = createSlice({
  name: "batchassignment",
  initialState,
  reducers: {
    setAssigmentsItems: (state, action: PayloadAction<any[] | []>) => {
      state.assignmentItems = action.payload;
    },
    setDialogItems: (state, action: PayloadAction<any[] | []>) => {
      state.dialogItems = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
      document.getElementById("scroll-top")?.scrollTo(0, 0);
    },
    setDialogPage: (state, action: PayloadAction<number>) => {
      state.dialogPage = action.payload;
      document.getElementById("scroll-top")?.scrollTo(0, 0);
    },
    setRowsPerPage: (state, action: PayloadAction<number>) => {
      state.rowsPerPage = action.payload;
      state.page = 1;
      document.getElementById("scroll-top")?.scrollTo(0, 0);
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
      state.page = 1;
    },
    setDialogSearchValue: (state, action: PayloadAction<string>) => {
      state.dialogsearchValue = action.payload;
      state.page = 1;
    },
    setSortValue: (state, action: PayloadAction<{ field: string; value: "DESC" | "ASC" }>) => {
      state.sortValue = action.payload;
      state.page = 1;
    },
    setTotalItems: (state, action: PayloadAction<number>) => {
      state.totalItems = action.payload;
    },
    setDialogTotalItems: (state, action: PayloadAction<number>) => {
      state.dialogTotalItems = action.payload;
    },
    setIsTableLoading: (state, action: PayloadAction<boolean>) => {
      state.isTableLoading = action.payload;
    },
    setFilterBy: (state, action: PayloadAction<{ fieldName: string; value: string[] }[]>) => {
      state.filterBy = action.payload;
      state.page = 1;
    },
    setDateFilter: (state, action: PayloadAction<{ start_date: string; end_date: string }>) => {
      state.dateFilter = action.payload;
    }, setIsOpenAddDialog: (state, action: PayloadAction<boolean>) => {
      state.isOpenAddDialog = action.payload;
    },
    setIsOpenEditDialog: (state, action: PayloadAction<boolean>) => {
      state.isOpenEditDialog = action.payload;
    },
  }
});

export const { setIsOpenAddDialog, setIsOpenEditDialog, setAssigmentsItems,
  setDialogPage,
  setDialogSearchValue,
  setPage,
  setRowsPerPage,
  setSearchValue,
  setSortValue,
  setTotalItems,
  setIsTableLoading,
  setDateFilter,
  setFilterBy,
  setDialogTotalItems,
  setDialogItems } = batchassignmentSlice.actions;
export default batchassignmentSlice.reducer;

