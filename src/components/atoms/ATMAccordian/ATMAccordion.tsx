import { IconArrowDown, IconArrowUp } from '@tabler/icons-react';
import React, { useState } from 'react'

type AccordionProps = {
    title: string;
    content: string
    isOpen?: boolean
    status: string
}
const ATMAccordion = ({ title, content, isOpen = false, status }: AccordionProps) => {
    const [isActive, setIsActive] = useState(isOpen)
    return (
        <>
            <div className='container w-full mx-auto'>
                <div className="border-2 border-gray-300 rounded-lg">
                    <div className="border-b border-gray-200">
                        <div className="flex items-center justify-between p-2 cursor-pointer"
                            onClick={() => setIsActive(!isActive)}>
                            {isActive ? <span className='flex items-center '><IconArrowUp className='mr-1' />{title}</span> : <span className='flex items-center'><IconArrowDown className='mr-1' />{title}</span>}
                            <button className='p-1 rounded-lg bg-stone-200'>{status}</button>
                        </div>
                        <div className="text-center" style={{ maxHeight: isActive ? '150px' : '0', transition: 'max-height 0.5s ease-out', overflow: 'hidden' }}>
                            <p className="p-3 border-t border-black border-1 ">{content}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ATMAccordion

