import { useAuth } from "../../authContext/useAuth";
import { useNavigate } from 'react-router-dom';
import { LogOutIcon } from "lucide-react";

const Logout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <button onClick={handleLogout}><LogOutIcon/></button>
    );
};

export default Logout;