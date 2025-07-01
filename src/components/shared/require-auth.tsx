import { useAuthStore } from "@/stores/auth-store";
import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
  const { token } = useAuthStore();
  return <>{token ? <Outlet /> : <Navigate to="/login" />}</>;
};

export default RequireAuth;
