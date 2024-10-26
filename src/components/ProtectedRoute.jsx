import { useAuth } from '../authContext/useAuth'; 
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }
    return children;
};

export default ProtectedRoute;