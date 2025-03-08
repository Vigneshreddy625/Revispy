import React, { useState } from 'react';
import { useAuth } from "../../authContext/useAuth";
import { useNavigate } from 'react-router-dom';
import { LogOutIcon, Loader2 } from "lucide-react";
import axios from 'axios'; 

const Logout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogout = async () => {
        setIsLoading(true);
        try {
            await logout(); 
            navigate("/login");
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            setIsLoading(false);
        }
    };
    

    return (
        <button onClick={handleLogout} disabled={isLoading}>
            {isLoading ? <Loader2 className="animate-spin" /> : <LogOutIcon />}
        </button>
    );
};

export default Logout;