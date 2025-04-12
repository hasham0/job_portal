import { useAppSelector } from "@/redux/hooks/hooks";
import { Navigate, Outlet } from "react-router-dom";

// Replace with your actual auth logic (Zustand, Context, etc.)

const ProtectedProfileRoute = () => {
  const { user } = useAppSelector((state) => state.auth);
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedProfileRoute;
