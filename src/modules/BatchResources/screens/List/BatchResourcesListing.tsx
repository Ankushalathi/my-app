
import { IconDotsVertical, IconPlus } from "@tabler/icons-react";
import { BatchResources } from "../../models/BatchResources.model";
import ATMPageHeader from "../../../../components/atoms/ATMPageHeader/ATMPageHeader";
import MOLFilterBar from "../../../../components/molecules/MOLFilterBar/MOLFilterBar";
import ATMPagination from "../../../../components/atoms/ATMPagination/ATMPagination";
import { TableHeader } from "../../../../components/molecules/MOLTable/MOLTable";
import ATMMenu from "../../../../components/atoms/ATMMenu/ATMMenu";
import ATMCopyToClipBoard from "../../../../components/atoms/ATMCopyToClipBoard/ATMCopyToClipBoard";
import { useState } from "react";
import ATMDataNotFoundPage from "../../../../components/atoms/ATMDataNotFoundPage/ATMDataNotFoundPage";
// import { useState } from "react";

type Props = {
  onAddNew: () => void;
  isLoading : boolean ;
  getActionOptions: any;
  rowData: BatchResources[];
  tableHeaders: TableHeader<BatchResources>[];
  filterPaginationData: {
    totalCount: number;
    totalPages: number;
  };
};
const BatchResourcesListing = ({
  onAddNew,
  tableHeaders,
  isLoading ,
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

         {isLoading ?<div className="grid grid-cols-6 gap-4 p-2">
          {Array(6)
              .fill(0)
              .map((_, index) => {
                return (
                  <div key={index} className="animate-pulse  h-[150px] p-2">
                    <div className="bg-slate-200 h-full rounded"> </div>
                  </div>
                );
              })}
         </div> :  <div>
            {rowData?.length ? 
           <div className="grid grid-cols-6 gap-4 p-2">{ rowData?.map((el: any, ind: any) => {
            const options = getActionOptions(el?._id);
            return (
              <div key={ind} className="border-2 rounded border-slate-200">
                {el?.type === "IMAGE" ? (
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[16px] font-semibold px-2">
                        {el?.title}
                      </span>
                      <div className="flex items-end">
                        <ATMCopyToClipBoard
                          copyText={el?.imageUrl}
                          onCopy={() => {
                            setIsCopied(true);
                          }}
                        />
                        <ATMMenu items={options} children={<div><IconDotsVertical /></div>} />
                      </div>
                    </div>
                    <img
                      className="h-[150px] w-[300px] p-2"
                      src={el?.imageUrl}
                      alt={el?.title}
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <span className="text-[16px] font-semibold px-2">
                      {el?.title}
                    </span>
                    <div className="flex items-center">
                      <ATMCopyToClipBoard
                        tooltipTitle={isCopied ? "Copied Url" : "Copy Url"}
                        copyText={el?.description}
                        onCopy={() => {
                          setIsCopied(true);
                          setTimeout(() => {
                            setIsCopied(false);
                          }, 1000);
                        }}
                      />
                      <ATMMenu items={options} children={<div><IconDotsVertical /></div>} />
                    </div>
                  </div>
                )}
              </div>
            );
          })} </div> : <div><ATMDataNotFoundPage message="NO DATA FOUND"  /> </div>}
          </div>}

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

