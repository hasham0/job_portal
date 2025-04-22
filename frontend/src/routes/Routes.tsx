import MainLayout from "@/layout/MainLayout";
import Companies from "@/pages/admin/Companies";
import CompaniesCreate from "@/pages/admin/CompaniesCreate";
import Company from "@/pages/admin/Company";
import Browse from "@/pages/Browse";
import Home from "@/pages/Home";
import JobDescription from "@/pages/JobDescription";
import Jobs from "@/pages/Jobs";
import Login from "@/pages/Login";
import Profile from "@/pages/Profile";
import SignUp from "@/pages/SignUp";
import ProtectedAdminWrapper from "@/protected/protected-admin-wrapper";
import ProtectedProfileRoute from "@/protected/protected-profile-wrapper";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/jobs",
        element: <Jobs />,
      },
      {
        path: "/description/:_id",
        element: <JobDescription />,
      },
      {
        path: "/browse",
        element: <Browse />,
      },
      {
        element: <ProtectedProfileRoute />,
        children: [{ path: "/profile", element: <Profile /> }],
      },
      {
        element: <ProtectedAdminWrapper />,
        children: [
          { path: "/admin/companies", element: <Companies /> },
          {
            path: "/admin/companies/create",
            element: <CompaniesCreate />,
          },
          { path: "/admin/company/:_id", element: <Company /> },
        ],
      },
    ],
  },
]);

export default router;
