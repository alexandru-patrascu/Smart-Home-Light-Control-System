import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "providers/AuthProvider";

const PublicRoutes = () => {
  const { isAuthenticated } = useAuth();

  return !isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PublicRoutes;
