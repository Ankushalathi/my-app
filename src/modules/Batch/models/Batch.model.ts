export type Batch = {
  batchName: string;
  courseName: string;
  modeName: string;
  startDate: string;
  time: string;
  language: string;
  noOfSeats: string;
  _id: string;
};

export type BatchFormValues = {
  batchName: string;
  course: string;
  mode: string;
  startFrom: string;
  timings: string;
  language: string;
  seats: string;
};
