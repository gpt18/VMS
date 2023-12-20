import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../modules/global/LandingPage";
import MainLayout from "../layouts/MainLayout.js";
import NotFound from '../components/NotFound/NotFound.js'
import Login from "../modules/global/Login.js";
import { AdminLayout } from "../layouts/AdminLayout.js";
import { DashboardPage } from "../modules/admin/DashboardPage.js";
import { VolunteerPage } from "../modules/admin/VolunteerPage.js";
import { EventPage } from "../modules/admin/EventPage.js";
import AddVolPage from "../modules/admin/AddVolPage.js";
import PrintList, { PrintCurrent } from "../components/PrintList.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <LandingPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/ngo",
    element: <AdminLayout/>,
    children: [
      {
        path: "",
        element: <DashboardPage />
      },
      {
        path: "vol",
        element: <VolunteerPage />,
      },
      {
        path: "event",
        element: <EventPage />
      },
      {
        path: "vol/new",
        element: <AddVolPage />
      },
    ]
  },
  {
    path: "/printList",
    element: <PrintList />
  },
  {
    path: "/print",
    element: <PrintCurrent />
  },
  {
    path: "*",
    element: <NotFound/>
  }
]);

export default router;
