import React from "react";
import MonacoEditor from "react-monaco-editor";
type Props = {
  activeFile: string;
  files: string[];
  theme?: string;
  codeContents: any;
  onCodeChange: (activeFile: string, newCode: string) => void;
  onFileChange: (newValue: string) => void;
  split?: boolean
};
const MOLCodeEditor: React.FC<Props> = ({
  activeFile,
  files,
  onFileChange,
  onCodeChange,
  codeContents,
  theme='vs-dark',
  split= false
}) => {
  const getFileLanguage = (filename: string) => {
    const extension = filename?.split(".")?.pop()?.toLowerCase();
    switch (extension) {
      case "html":
        return "html";
      case "css":
        return "css";
      case "js":
        return "javascript";
      default:
        return "plaintext";
    }
  };
  const getCodeForFile = (filename: string) => codeContents[filename];
  return (
    <div className={`grid w-full h-full  ${split ? "grid-cols-1 grid-rows-2" : "grid-cols-2 grid-rows-1" }`}>
      <div className="flex flex-col h-full overflow-auto hide-scroll">
        <div className="flex gap-1 px-2">
          {files?.map((file) => {
            const isSelected = file === activeFile;
            return (
              <div
                key={file}
                onClick={() => onFileChange(file)}
                className={`relative text-xs text-white bg-[#1E1E1E] cursor-pointer rounded-t-md`}
              >
                {isSelected ? (
                  <div className="absolute top-0 w-full h-1 bg-yellow-500 rounded-t-md "></div>
                ) : null}
                <div className="px-4 py-1">{file}</div>
              </div>
            );
          })}
        </div>
        <div className="flex-1 w-full" >
          <MonacoEditor
            language={getFileLanguage(activeFile)}
            theme={theme}
            value={getCodeForFile(activeFile)}
            onChange={(newCode:any) => onCodeChange(activeFile, newCode)}
            options={{}}
            key={activeFile}
            className={'!h-full !w-full'}
          />
        </div>
      </div>
      <div className="flex flex-col h-full overflow-auto hide-scroll ">
        <div className="flex gap-1 px-2">
          <div
            className={`relative text-xs italic bg-white border border-b-0 cursor-pointer rounded-t-md border-slate-300`}
          >
            <div className="absolute top-0 w-full h-1 bg-yellow-500 rounded-t-md "></div>
            <div className="px-4 py-1"> Result </div>
          </div>
        </div>
        <iframe
          title="Live Preview"
          className="flex-1 w-full overflow-auto border "
          srcDoc={`<html><head><style>${codeContents["styles.css"]}</style></head><body>${codeContents["index.html"]}<script>${codeContents["script.js"]}</script></body></html>`}
        ></iframe>
      </div>
    </div>
  );
};
export default MOLCodeEditor;