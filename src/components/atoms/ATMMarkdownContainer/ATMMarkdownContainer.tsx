import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
  markdown: string;
};

const ATMMarkdownContainer = ({ markdown }: Props) => {
  return (
    <div className="prose overflow-clip">
      <Markdown  remarkPlugins={[remarkGfm]} children={markdown} />
    </div>
  );
};

export default ATMMarkdownContainer;