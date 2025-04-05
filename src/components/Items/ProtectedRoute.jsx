import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../authContext/useAuth";
import DogLoading from "./DogLoading";

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <DogLoading/>;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
