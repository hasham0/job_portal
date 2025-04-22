import { useAppSelector } from "@/redux/hooks/hooks";
import { Navigate, Outlet } from "react-router-dom";

// Replace with your actual auth logic (Zustand, Context, etc.)

const ProtectedAdminWrapper = () => {
  const { user } = useAppSelector((state) => state.auth);
  return user && user.role === "recruiter" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedAdminWrapper;
