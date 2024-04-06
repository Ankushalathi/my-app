export type BatchAssignment = {
  questionTitle: string;
  complexity: string;
  _id: string;
};

export type BatchAssignmentFormValues = {
  questionTitle: string;
};
export type BatchSlceStateType ={
  assignmentItems: any[] | [];
  isOpenAddDialog:boolean ;
  isOpenEditDialog:boolean;
  totalItems: number;
  isTableLoading: boolean;
  page: number;
  dialogTotalItems : number ;
  dialogItems :any[];
  dialogPage : number ;
  dialogsearchValue : string ;
  rowsPerPage: number;
  searchValue: string;
  sortValue: { field: string; value: "DESC" | "ASC" };
  filterBy: {
    fieldName: string;
    value: string[];
  }[];
  dateFilter: {
    start_date: string | null;
    end_date: string | null;
  };
}
