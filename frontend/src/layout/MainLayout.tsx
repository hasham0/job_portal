import Navbar from "@/components/shared/navbar";
import { Outlet } from "react-router-dom";

type Props = {};

export default function MainLayout({}: Props) {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
