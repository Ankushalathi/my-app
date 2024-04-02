import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import SideNavLayout from "./components/layouts/SideNavLayout/SideNavLayout";
import LoginFormWrapper from "./modules/Login/LoginFormWrapper";
import AuthWrapper from "./components/AuthWrapper/AuthWrapper";
import BatchStudentListingWrapper from "./modules/BatchStudent/screens/List/BatchStudentListingWrapper";
import BathcListingWrapper from "./modules/Batch/screens/BathcListingWrapper";
import AttendanceListingWrapper from "./modules/Attendance/screens/List/AttendanceListingWrapper";
import BatchAssignmentListingWrapper from "./modules/BatchAssignment/screens/List/BatchAssignmentListingWrapper";

type Props = {};

const PageRoutes = (props: Props) => {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginFormWrapper />,
    },
    {
      element: <SideNavLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "batch-student",
          element: <BatchStudentListingWrapper />,
        },
      ],
    },

    {
      element: (
        <AuthWrapper>
          <SideNavLayout />
        </AuthWrapper>
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/batch",
          element: <BathcListingWrapper />,
        },
        {
          path: "/attendance",
          element: <AttendanceListingWrapper />,
        },
      ],
    },

    {
      element: (
        <AuthWrapper>
          <SideNavLayout />
        </AuthWrapper>
      ),
      errorElement: <ErrorPage />,
      children:[
        {
          path: "/assignment",
          element: <BatchAssignmentListingWrapper />,
        },
      ]
    },
    
    {
      path: "/",
      element: <SideNavLayout />,
      errorElement: <ErrorPage />,
    },
    {
      path: "batch-student",
      element: <BatchStudentListingWrapper />,
    },
    {
      path: "/batch",
      element: <BathcListingWrapper />,
    },
    {
      path: "/assignment",
      element: <BatchAssignmentListingWrapper />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default PageRoutes;