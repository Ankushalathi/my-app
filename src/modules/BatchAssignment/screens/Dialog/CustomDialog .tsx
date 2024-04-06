import React, { useState } from "react";
import MOLFormDialog from "../../../../components/molecules/MOLFormDialog/MOLFormDialog";
import ViewSolutionScreen from "../Component/ViewSolutionScreen";
type Component = {
  onClose: () => void;
  solutionData: any;
};

const CustomDialog = ({ onClose, solutionData }: Component) => {
  const [assignmentSolution, setAssignmentSolution] = useState();
  const [selectedId, setSelectedId] = useState("");
  //get Student Options
  const getStudents = solutionData?.assignment?.map((data: any) => ({
    label: data?.studentLabel,
    value: data?.studentId,
    solutions: data?.solution,
    remark: data?.remark,
  }));

  return (
    <MOLFormDialog
      hideActionButton
      title=""
      onClose={onClose}
      isSubmitting={false}
      size="large"
    >
      {solutionData?.assignment?.[0]?.studentId ? (
        <div className="grid grid-cols-12 border">
          <div className="col-span-2 mr-2 border">
            <div className="font-semibold text-center border-b">
              All Student
            </div>
            {getStudents?.map((el: any, ind: number) => {
              return (
                <>
                  <div
                    className="flex items-center gap-3 px-2 cursor-pointer"
                    onClick={() => {
                      setAssignmentSolution(el?.solutions);
                      setSelectedId(el?.value);
                    }}
                  >
                    <span>{ind + 1}.</span>
                    <span
                      className={`${
                        el?.value === selectedId
                          ? "text-red-400 font-medium"
                          : ""
                      } capitalize`}
                    >
                      {el?.label}
                    </span>
                  </div>
                </>
              );
            })}
          </div>
          <div className="col-span-10">
            <div className="font-medium border-b p-2">{solutionData?.questionLabel}</div>
            <div>
              <ViewSolutionScreen data={assignmentSolution} />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-[150px]  text-xl font-semibold text-red-800">
          No Student has done it yet{" "}
        </div>
      )}
    </MOLFormDialog>
  );
};

export default CustomDialog;
