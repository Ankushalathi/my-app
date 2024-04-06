/* eslint-disable react/jsx-no-undef */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconBook, IconCalendarMonth, IconUserCog,IconUser } from '@tabler/icons-react';
import ViewListing from './BatchViewLayout';

type Props = {};

const BatchViewLayoutWrapper = (props: Props) => {

    const navigate = useNavigate()

    useEffect(() => {
        navigate("student")
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const listData = [
        {
            label: "Student",
            icon: IconUser,
            onClick: () => navigate("student"),
            path: "student"
        },
        {
            label: "Assignment",
            icon: IconBook,
            onClick: () => navigate("assignment"),
            path: "assignment"
        },
        {
            label: "Attendance",
            icon: IconCalendarMonth,
            onClick: () => navigate("attendance"),
            path: "attendance"
        },
        {
            label: "Resources",
            icon: IconUserCog,
            onClick: () => navigate("resources"),
            path: "resources"
        }
    ]
    return (
        <>
            <ViewListing
                tabName={listData}
            />
        </>
    );
};

export default BatchViewLayoutWrapper;