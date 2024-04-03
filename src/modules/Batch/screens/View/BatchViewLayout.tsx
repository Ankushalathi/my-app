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
                <div className="flex flex-col overflow-auto border rounded border-slate-300">
                    <ul className="flex gap-5 px-4 text-xs text-gray-600">
                        {tabName?.map((tab, ind) => (
                            <NavLink
                                to={tab?.path}
                                className={({ isActive }) =>
                                    isActive ? "border-b-2 border-black" : ""
                                }
                            >
                                {" "}
                                <li className="flex items-center gap-1 p-2" key={ind}>
                                    {<tab.icon className="size-4" />}
                                    {tab.label}{" "}
                                </li>{" "}
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