export type Attendance = {
  studentsData: {
    name: string;
    mobileNumber: string;
    isPresent: any;
    cameOnTime: any;
    _id: string;
  }[];
};

export type AttendanceFormValues = {
  name: string;
  mobileNumber: string;
  isPresent: any;
  cameOnTime: any;
};
