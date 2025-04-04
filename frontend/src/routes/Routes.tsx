import MainLayout from "@/layout/MainLayout";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Profile from "@/pages/Profile";
import SignUp from "@/pages/SignUp";
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
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);

export default router;
