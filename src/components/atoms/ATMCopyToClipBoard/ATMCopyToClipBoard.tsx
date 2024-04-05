import { IconCopy } from '@tabler/icons-react';
import React, { useState } from 'react';
import { IconCopyCheck } from '@tabler/icons-react';

type Copy = {
    copyText: string;
    onCopy: () => void;
    tooltipTitle?: string;
    children?: any;

}
const ATMCopyToClipboard = ({ copyText, onCopy, tooltipTitle, children }: Copy) => {
    const [isCopied, setIsCopied] = useState(false);
    return (
        <button
            onClick={() => {
                navigator.clipboard.writeText(copyText).then(() => {
                    onCopy?.();
                    setIsCopied(true);

                    setTimeout(() => {
                        setIsCopied(false);
                    }, 1000);
                });
            }}
        >
            {children ? (
                children
            ) : (
                <div>
                    {isCopied ? (
                        <IconCopyCheck size={24} className="text-green-500" />
                    ) : (
                        <IconCopy size={24} />
                    )}
                </div>
            )}
        </button>
    );
};

export default ATMCopyToClipboard;
