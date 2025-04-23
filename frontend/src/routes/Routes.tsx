import CompaniesCreate from "@/pages/admin/CompaniesCreate";
import Companies from "@/pages/admin/Companies";
import Company from "@/pages/admin/Company";
import JobsPanel from "@/pages/admin/JobsPanel";
import MainLayout from "@/layout/MainLayout";
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
import JobUpdate from "@/pages/admin/JobUpdate";
import JobsCreate from "@/pages/admin/JobsCreate";

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
          { path: "/admin/jobs", element: <JobsPanel /> },
          { path: "/admin/jobs/create", element: <JobsCreate /> },
          { path: "/admin/jobDetails/:_id", element: <JobUpdate /> },
        ],
      },
    ],
  },
]);

export default router;
