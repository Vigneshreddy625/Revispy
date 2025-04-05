import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../authContext/useAuth";
import MainLoading from "./MainLoading";

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <MainLoading/>;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
