import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import SideNavLayout from "./components/layouts/SideNavLayout/SideNavLayout";
import LoginFormWrapper from "./modules/Login/LoginFormWrapper";
import AuthWrapper from "./components/AuthWrapper/AuthWrapper";
import BatchAssignmentListingWrapper from "./modules/BatchAssignment/screens/List/BatchAssignmentListingWrapper";

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
      path: "/assignment",
      element: <BatchAssignmentListingWrapper />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default PageRoutes;