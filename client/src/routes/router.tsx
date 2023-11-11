import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../modules/global/LandingPage";
import MainLayout from "../layouts/MainLayout/MainLayout";
import NotFound from '../components/NotFound/NotFound.js'

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <LandingPage />,
      },
      {
        path: "*",
        element: <NotFound/>,
      }
    ],
  },
  {
    path: "*",
    element: <NotFound/>
  }
]);

export default router;
