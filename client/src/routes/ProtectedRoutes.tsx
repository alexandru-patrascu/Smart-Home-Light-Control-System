import { Navigate } from "react-router-dom";
import { useAuth } from "providers/AuthProvider";
import Layout from "layout";

const ProtectedRoutes = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Layout /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
