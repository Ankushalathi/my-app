/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { FormikProps } from "formik";
import { AssignDialogFormValuesType } from "../screens/Add/AddBatchAssignmentFormWrapper";
import ATMSelect from "../../../components/atoms/FormElements/ATMSelect/ATMSelect";
import {
  setDialogPage,
  setDialogTotalItems,
  setDialogItems,
} from "../slice/BatchAssignmentSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import InfiniteScroll from "react-infinite-scroll-component";
import ATMMarkdownContainer from "../../../components/atoms/ATMMarkdownContainer/ATMMarkdownContainer";
import { ATMButton } from "../../../components/atoms/ATMButton/ATMButton";
import ATMTextField from "../../../components/atoms/FormElements/ATMTextField/ATMTextField";
import { useParams } from "react-router-dom";
import { showToast } from "../../../utils/showToaster";
import ATMCircularProgress from "../../../components/atoms/ATMCircularProgress/ATMCircularProgress";
import { useGetAllQuestionsQuery, useGetAlltagQuery } from "../screens/Services/AssignmentServices";
import MOLFormDialog from "../../../components/molecules/MOLFormDialog/MOLFormDialog";

type Props = {
  formikProps: FormikProps<AssignDialogFormValuesType>;
  onClose: () => void;
  addAssign: any;
  addLoading: boolean;
  batchData: any;
  formType: "ADD" | "UPDATE";
};
const ComplexityOptions = [
  {
    label: 'SUPER_EASY',
    value: 'SUPER_EASY'
  },
  {
    label: 'EASY',
    value: 'EASY'
  },
  {
    label: 'MEDIUM',
    value: 'MEDIUM'
  },
  {
    label: 'HARD',
    value: 'HARD'
  }
]

const BatchAssignmentFormLayout = ({
  formikProps,
  onClose,
  addAssign,
  addLoading,
  batchData,
  formType,
}: Props) => {
  const { values, setFieldValue, handleBlur, isSubmitting } = formikProps;
  const dispatch = useDispatch<AppDispatch>();
  const { batchId } = useParams();
  const { dialogPage, dialogItems, dialogTotalItems } = useSelector(
    (state: RootState) => state.batchassignment
  );


  const { data, isLoading, isFetching } = useGetAllQuestionsQuery(
    {
      limit: 10,
      searchValue: values?.searchValue || "",
      params: ["question"],
      page: dialogPage,
      filterBy: [
        {
          fieldName: "tagId._id",
          value: values?.tagId?.value ? [values?.tagId?.value] : [],
        },

        {
          fieldName: "complexity",
          value: values?.complexity?.value ? [values?.complexity?.value] : [],
        },
        {
          fieldName: "order",
          value: values?.order ? [Number(values?.order)] : [],
        },
      ],
      dateFilter: {},
      orderBy: "createdAt",
      orderByValue: -1,
      isPaginationRequired: true,
    }
  );

  //Tags Data
  const {
    data: AllTagsData,
    isLoading: tagsDataIsLoading,
    isFetching: tagsDataIsFetching,
  } = useGetAlltagQuery("");
  const tagsOptions = AllTagsData?.data?.map((el: any) => {
    return {
      label: el?.tagName,
      value: el?._id,
    };
  });


  useEffect(() => {
    if (!isLoading && !isFetching) {
      if (dialogPage === 1) {
        dispatch(setDialogItems(data?.data))
      } else {
        dispatch(setDialogItems(dialogItems.concat(data?.data)))
      }

      dispatch(setDialogTotalItems(data?.totalItem));
    }
  }, [isFetching, isLoading, data]);

  const handleScroll = () => {
    dispatch(setDialogPage(dialogPage + 1));
  };
  
  const batchDataQuestionIdArray = batchData?.map((el:any)=>el?.questionId)
  return (
    <>
      <MOLFormDialog
        title=""
        onClose={onClose}
        isSubmitting={isSubmitting}
      >
        <div className="w-full h-screen ">
          <div className="flex items-center justify-between">
            <div className="text-xl font-medium">Assignment</div>
            <div className="flex items-center justify-between">
              <div className="text-xl font-medium">
                {formType === "ADD" ? "Add Resource" : "Update Resource"}{" "}
              </div>
            </div>
          </div>
          <div className="p-2 shadow-md">
            <div className="flex justify-end">
              <span
                onClick={() => {
                  setFieldValue("tagId", "");
                  setFieldValue("searchValue", "");
                  setFieldValue("complexity", "");
                  setFieldValue("order", "");
                }}
                className="text-amber-600 text-[14px] font-medium cursor-pointer"
              >
                Reset Filters
              </span>
            </div>
            <div className="grid grid-cols-4 gap-6 pb-2">
              {/* Tags */}

              <div>
                <ATMSelect
                  name="tagId"
                  value={values?.tagId}
                  onChange={(newValue) => {
                    setFieldValue("tagId", newValue);
                  }}
                  onBlur={handleBlur}
                  label="Tags"
                  placeholder="Select Tags"
                  options={tagsOptions}
                  isLoading={tagsDataIsLoading || tagsDataIsFetching}
                />
              </div>

              {/* Complexity */}
              <div>
                <ATMSelect
                  name="complexity"
                  value={values?.complexity}
                  onChange={(newValue) => setFieldValue("complexity", newValue)}
                  onBlur={handleBlur}
                  label="Complexity"
                  placeholder="Select Complexity"
                  options={ComplexityOptions}
                />
              </div>
              {/* Order */}
              <div>
                <ATMTextField
                  name="order"
                  value={values?.order}
                  onChange={(e) => setFieldValue("order", e.target.value)}
                  onBlur={handleBlur}
                  label="Order"
                  placeholder="Order"

                />
              </div>
            </div>
            <div className="grid grid-cols-4">
              {/* Field Label */}
              <div className="">
                <ATMTextField
                  name="searchValue"
                  value={values?.searchValue}
                  onChange={(e) => setFieldValue("searchValue", e.target.value)}
                  label="Search"
                  placeholder="search"
                  onBlur={handleBlur}
                />
              </div>
            </div>
          </div>
          {(isLoading || addLoading) ?
            <div className="absolute w-[100%] h-[100%] flex justify-center items-center z-10 bg-slate-100 opacity-50">
              <ATMCircularProgress />
            </div>
            : dialogItems?.length ? (
              <div
                id="scrollable-activity-div"
                className="w-[calc(100%-2px)] border h-full overflow-scroll p-3"
              >
                {/* Scroll For Date */}
                <InfiniteScroll
                  dataLength={dialogItems?.length || 0}
                  scrollableTarget={"scrollable-activity-div"}
                  next={handleScroll}
                  scrollThreshold={0.1}
                  hasMore={dialogItems?.length !== dialogTotalItems}
                  loader={
                    <div className="grid w-full grid-cols-1 gap-3 mt-3 overflow-auto">
                      {Array(4)
                        .fill(null)
                        .map((_, index) => (
                          <div key={index} className="animate-pulse  h-[60px] p-2">
                            <div className="h-full rounded bg-slate-200" />
                          </div>
                        ))}
                    </div>
                  }
                >
                  {dialogItems?.map((item: any, ind: number) => {
                    return (
                      <React.Fragment key={ind}>
                        <div className="w-full px-3 py-2 my-2 border-b rounded shadow-md bg-slate-50">
                          <span className="font-medium text-primary-light ">
                            <ATMMarkdownContainer markdown={item?.title} />
                          </span>
                          <div className="flex justify-end">
                            {batchDataQuestionIdArray?.includes(item?._id) ? (
                              <ATMButton
                                onClick={() => {
                                  addAssign({
                                    batchId: batchId,
                                    questionId: item?._id,
                                    assignstatus: false,
                                  }).then((res: any) => {
                                    if (res?.error) {
                                      showToast(
                                        "error",
                                        res?.error?.data?.message
                                      );
                                    } else {
                                      if (res?.data?.status) {
                                        showToast("success", res?.data?.message);
                                      } else {
                                        showToast("error", res?.data?.message);
                                      }
                                    }
                                  });
                                }}
                                extraClasses="w-24 h-[30px] rounded-md bg-red-700 text-white font-medium"
                              >
                                Remove
                              </ATMButton>
                            ) : (
                              <ATMButton
                                onClick={() => {
                                  addAssign({
                                    batchId: batchId,
                                    questionId: item?._id,
                                    assignstatus: true,
                                  }).then((res: any) => {
                                    if (res?.error) {
                                      showToast(
                                        "error",
                                        res?.error?.data?.message
                                      );
                                    } else {
                                      if (res?.data?.status) {
                                        showToast("success", res?.data?.message);
                                      } else {
                                        showToast("error", res?.data?.message);
                                      }
                                    }
                                  });
                                }}
                                extraClasses="w-24 h-[30px] rounded-md bg-green-700 text-white font-medium"
                              >
                                Add
                              </ATMButton>
                            )
                            }
                          </div>
                        </div>
                      </React.Fragment>
                    );
                  })}
                </InfiniteScroll>
              </div>
            ) : (
              <div className="h-[300px] flex justify-center items-center text-[20px] text-red-800 font-medium">
                No Data Found{" "}
              </div>
            )}
        </div>
      </MOLFormDialog>
    </>
  );
};

export default BatchAssignmentFormLayout;