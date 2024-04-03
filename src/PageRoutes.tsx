import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import SideNavLayout from "./components/layouts/SideNavLayout/SideNavLayout";
import BathcListingWrapper from "./modules/Batch/screens/BathcListingWrapper";
import LoginFormWrapper from "./modules/Login/LoginFormWrapper";

type Props = {};

const PageRoutes = (props: Props) => {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginFormWrapper />,
    },
    {
      path: "/",
      element: <SideNavLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "batch",
          element: <BathcListingWrapper />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default PageRoutes;
