export type BatchStudent = {
  createdAt: string;
  name: string;
  mobile: number;
  notSubmittedAssignmentsCount:string ;
  totalAssignments :string ;
  email: string;
  _id: string;
};

export type BatchStudentFormValues = {
  name: string;
};
