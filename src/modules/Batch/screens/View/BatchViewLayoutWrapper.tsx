/* eslint-disable react/jsx-no-undef */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconTarget } from '@tabler/icons-react';
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
            icon: IconTarget,
            onClick: () => navigate("student"),
            path: "student"
        },
        {
            label: "Assignment",
            icon: IconTarget,
            onClick: () => navigate("assignment"),
            path: "assignment"
        },
        {
            label: "Attendance",
            icon: IconTarget,
            onClick: () => navigate("attendance"),
            path: "attendance"
        },
        {
            label: "Resources",
            icon: IconTarget,
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