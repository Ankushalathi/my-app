import { Icon } from '@tabler/icons-react';
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import ATMPageHeader from '../../../../components/atoms/ATMPageHeader/ATMPageHeader';

type Props = {
    tabName?: { label: string; icon: Icon; onClick: () => void; path: string }[];
};

const BatchViewLayout = ({ tabName }: Props) => {
    return (
        <>
            <div className="flex flex-col h-full gap-4">
                <ATMPageHeader heading="Batch" hideButton />
                <div className="flex flex-col overflow-auto font-semibold border rounded border-slate-300" >
                    <ul className="flex flex-wrap gap-2 px-2 text-xs text-gray-600 md:gap-8 md:px-4 md:text-sm">
                        {tabName?.map((tab, ind) => (
                            <NavLink
                                to={tab?.path}
                                className={({ isActive }) =>
                                    isActive ? "border-b-2 border-black" : ""
                                }
                                key={ind}
                            >
                                <li className="flex items-center gap-2 p-1">
                                    {<tab.icon className="size-4 md:size-4" />}
                                    {tab.label}
                                </li>
                            </NavLink>
                        ))}
                    </ul>
                </div>
                <div className="flex-1 overflow-auto">
                    <Outlet />
                </div>
            </div>

        </>

    );
};

export default BatchViewLayout;