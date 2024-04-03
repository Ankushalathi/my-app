
import { IconDotsVertical, IconPlus } from "@tabler/icons-react";
import { BatchResources } from "../../models/BatchResources.model";
import ATMPageHeader from "../../../../components/atoms/ATMPageHeader/ATMPageHeader";
import MOLFilterBar from "../../../../components/molecules/MOLFilterBar/MOLFilterBar";
import ATMPagination from "../../../../components/atoms/ATMPagination/ATMPagination";
import { TableHeader } from "../../../../components/molecules/MOLTable/MOLTable";
import ATMMenu from "../../../../components/atoms/ATMMenu/ATMMenu";
import { useState } from "react";

type Props = {
  onAddNew: () => void;
  getActionOptions: any;
  rowData: BatchResources[];
  tableHeaders: TableHeader<BatchResources>[];
  filterPaginationData: {
    totalCount: number;
    totalPages: number;
  };
};

const dummayData = [{
  _id: '1',
  type: 'IMAGE',
  imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGNuADZ16Qoi7ULtwHLJ1t1apXAsDa5krU5YFXkv-MfA&s',
  title: 'Image Data'
}]

const BatchResourcesListing = ({
  onAddNew,
  tableHeaders,
  getActionOptions,
  rowData,
  filterPaginationData: { totalCount, totalPages },
}: Props) => {
  const [isCopied, setIsCopied] = useState(false)
  return (
    <>
      <div className="flex flex-col h-full gap-2">
        <ATMPageHeader
          heading="Resources"
          buttonProps={{
            label: "Add New",
            icon: IconPlus,
            onClick: onAddNew,
          }}
        />
        <div className="flex flex-col overflow-auto border rounded border-slate-300">
          {/* Table Toolbar */}
          <MOLFilterBar />

          <div className="grid grid-cols-6 m-2 ">
            {
              dummayData?.map((el: any, ind: any) => {
                const options = getActionOptions(el?._id);
                return (
                  <div className="px-2 border-2 rounded border-slate-200">
                    {el?.type === "IMAGE" ? (
                      <div>
                        <div className="flex items-center justify-end p-0">
                          {/* <ATMCopyToClipboard
                                    tooltipTitle={isCopied ? "Copied Url" : "Copy Url"}
                                    copyText={el?.imageUrl}
                                    onCopy={() => {
                                      setIsCopied(true);
                                      setTimeout(() => {
                                        setIsCopied(false);
                                      }, 1000);
                                    }}
                                  >
                                    copy
                                  </ATMCopyToClipboard> */}
                          <ATMMenu items={options} children={<div><IconDotsVertical className="p-0" /></div>} />
                        </div>
                        {" "}
                        <img
                          className="h-[150px ] w-[300px]"
                          src={el?.imageUrl}
                          alt={el?.title}
                        />
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-[16px]  font-semibold">
                            {el?.title}{" "}
                          </span>


                        </div>{" "}
                      </div>
                    ) : (
                      <div className="h-[150px]">
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-[16px]  font-semibold">
                            {el?.title}{" "}
                          </span>

                          {/* <div className="flex items-center">
                                 <ATMCopyToClipboard
                                    tooltipTitle={isCopied ? "Copied Url" : "Copy Url"}
                                    copyText={el?.description}
                                    onCopy={() => {
                                      setIsCopied(true);
                                      setTimeout(() => {
                                        setIsCopied(false);
                                      }, 1000);
                                    }}
                                  >
                                   copy
                                  </ATMCopyToClipboard>
                                  <ATMMenu   items={options} children={<div>Menu</div> } />
                                 </div> */}
                        </div>{" "}
                      </div>
                    )}
                  </div>
                );
              })

            }
          </div>
          {/* Pagination */}
          <ATMPagination
            totalPages={totalPages}
            rowCount={totalCount}
            rows={rowData}
          />
        </div>
      </div>
    </>
  );
};

export default BatchResourcesListing;

