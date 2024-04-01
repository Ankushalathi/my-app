import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import SideNavLayout from "./components/layouts/SideNavLayout/SideNavLayout";
import LoginFormWrapper from "./modules/Login/LoginFormWrapper";
import BathcListingWrapper from "./modules/Batch/screens/BathcListingWrapper";
import AuthWrapper from "./components/AuthWrapper/AuthWrapper";
import AttendanceListingWrapper from "./modules/Attendance/screens/List/AttendanceListingWrapper";

type Props = {};

const PageRoutes = (props: Props) => {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginFormWrapper />,
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
          path: "/batch",
          element: <BathcListingWrapper />,
        },
        {
          path: "/attendance",
          element: <AttendanceListingWrapper />,
        },
      ]
    },
    
    {
      path: "/",
      element: <SideNavLayout />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/batch",
      element: <BathcListingWrapper />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default PageRoutes;
