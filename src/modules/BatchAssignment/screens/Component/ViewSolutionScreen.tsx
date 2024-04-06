import { useState } from "react";
import MOLCodeEditor from "../../../../components/molecules/MOLCodeEditor/MOLCodeEditor";

type Props = {
    data: any;
    editorValue?: string;
};

const ViewSolutionScreen = ({ data, editorValue }: Props) => {

    const [activeFile, setActiveFile] = useState("index.html");
    const [files] = useState(["index.html", "styles.css", "script.js"]);
    const handleFileChange = (newFile: string) => {
        setActiveFile(newFile);
    };

 console.log(data ,"data 0001")
    return (
        <div className="p-4 flex flex-col h-[500px]">
            <div className="flex-1 overflow-hidden " >
                <MOLCodeEditor
                    activeFile={activeFile}
                    files={files}
                    onFileChange={handleFileChange}
                    codeContents={{
                        "index.html": data?.[0]?.answer,
                        "styles.css": data?.[1]?.answer,
                        "script.js": data?.[2]?.answer,
                    }}
                    onCodeChange={() => { console.log('hello') }}
                />
            </div>
        </div>
    );
};

export default ViewSolutionScreen;





