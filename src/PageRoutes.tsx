import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import SideNavLayout from "./components/layouts/SideNavLayout/SideNavLayout";
import LoginFormWrapper from "./modules/Login/LoginFormWrapper";
import BathcListingWrapper from "./modules/Batch/screens/List/BatchListingWrapper";
import AttendanceListingWrapper from "./modules/Attendance/screens/List/AttendanceListingWrapper";
import BatchAssignmentListingWrapper from "./modules/BatchAssignment/screens/List/BatchAssignmentListingWrapper";
import BatchStudentListingWrapper from "./modules/BatchStudent/screens/List/BatchStudentListingWrapper";
import BatchViewLayoutWrapper from "./modules/Batch/screens/View/BatchViewLayoutWrapper";
import BatchResourcesListingWrapper from "./modules/BatchResources/screens/List/BatchResourcesListingWrapper";

type Props = {};

const PageRoutes = (props: Props) => {
  const router = createBrowserRouter([
    // {
    //   path: "/login",
    //   element: <LoginFormWrapper />,
    // },
    {
      path: "/",
      element: <SideNavLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "batch",
          element: <BathcListingWrapper />,
        }, {
          path: "batch/view/:batchId",
          element: <BatchViewLayoutWrapper />,
          children: [
            {
              path: "student",
              element: <BatchStudentListingWrapper />,
            },
            {
              path: "assignment",
              element: <BatchAssignmentListingWrapper />,
            },
            {
              path: "attendance",
              element: < AttendanceListingWrapper />,
            },
            {
              path: "resources",
              element: < BatchResourcesListingWrapper />,
            }
          ]
        },

      ],
    },

  ]);

  return <RouterProvider router={router} />;
};

export default PageRoutes;
