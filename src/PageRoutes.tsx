import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import SideNavLayout from "./components/layouts/SideNavLayout/SideNavLayout";
import LoginFormWrapper from "./modules/Login/LoginFormWrapper";
import AuthWrapper from "./components/AuthWrapper/AuthWrapper";
import BatchStudentListingWrapper from "./modules/BatchStudent/screens/List/BatchStudentListingWrapper";

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
      children: [
        {
          path: "batch-student",
          element: <BatchStudentListingWrapper />,
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
  ]);

  return <RouterProvider router={router} />;
};

export default PageRoutes;