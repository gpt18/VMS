import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../modules/global/LandingPage";
import MainLayout from "../layouts/MainLayout.js";
import NotFound from '../components/NotFound/NotFound.js'
import Login from "../modules/global/Login.js";
import { AdminLayout } from "../layouts/AdminLayout.js";

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
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/ngo",
    element: <AdminLayout/>
  },
  {
    path: "*",
    element: <NotFound/>
  }
]);

export default router;
