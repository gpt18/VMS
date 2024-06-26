import { Navigate, createBrowserRouter } from "react-router-dom";
import LandingPage from "../modules/global/LandingPage";
import MainLayout from "../layouts/MainLayout.js";
import NotFound from '../components/NotFound/NotFound.js'
import { AdminLayout } from "../layouts/AdminLayout.js";
import { DashboardPage } from "../modules/ngo/DashboardPage.js";
import { VolunteerPage } from "../modules/ngo/VolunteerPage.js";
import { EventPage } from "../modules/ngo/EventPage.js";
import PrintList from "../components/PrintList.js";
import Login from "../modules/global/Login.tsx";
import { SignUp } from "../modules/global/Signup.tsx";
import { VolHomePage } from "../modules/volunteer/HomePage.tsx";
import { NgoDataProvider } from "../hooks/NgoDataContext.tsx";
import RegisterNgoProfile from "../modules/ngo/RegisterNgoProfile.tsx";
import RestrictedRouteTo from "./permissionRouter.tsx";
import { Role } from "../utils/costants.ts";
import NgoProfile from "../modules/ngo/NgoProfile.tsx";
import VolnteerProfile from "../modules/ngo/VolProfile.tsx";
import AddNewVolunteer from "../modules/ngo/AddNewVolunteer.tsx";
import { ImageUploader } from "../modules/global/ImageUpload.tsx";

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
    element: <Login />,
  },
  {
    path: "/ngo",
    element: <>
      <RestrictedRouteTo role={[Role.NGO]}>
        <NgoDataProvider>
          <AdminLayout />
        </NgoDataProvider>
      </RestrictedRouteTo>
    </>,
    children: [
      {
        path: "",
          element: <Navigate to={"home"} replace/>,
      },
      {
        path: "home",
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
        element: <AddNewVolunteer />
      },
      {
        path: "profile",
        element: <NgoProfile />
      },
      {
        path: "vol/:id",
        element: <VolnteerProfile />
      },
    ]
  },
  {
    path: "ngo/register",
    element: <RestrictedRouteTo role={[Role.NGO]}><RegisterNgoProfile/></RestrictedRouteTo>
  },
  {
    path: "/vol",
    element: <RestrictedRouteTo role={[Role.VOLUNTEER]}><VolHomePage /></RestrictedRouteTo>
  },
  {
    path: "/ngo-signup",
    element: <SignUp role={"ngo"} />
  },
  {
    path: "/vol-signup",
    element: <SignUp role={"volunteer"} />
  },
  {
    path: "/printList",
    element: <PrintList />
  },
  {
    path: '/upload',
    element: <ImageUploader />
  },
  {
    path: "*",
    element: <NotFound />
  }
]);

export default router;
