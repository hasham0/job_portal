import MainLayout from "@/layout/MainLayout";
import Browse from "@/pages/Browse";
import Home from "@/pages/Home";
import JobDescription from "@/pages/JobDescription";
import Jobs from "@/pages/Jobs";
import Login from "@/pages/Login";
import Profile from "@/pages/Profile";
import SignUp from "@/pages/SignUp";
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
    ],
  },
]);

export default router;
