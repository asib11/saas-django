import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import api from '../api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import {jwtDecode} from 'jwt-decode';

const ProtectedRoute = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(()=>{
        auth().catch(() => setIsAuthenticated(false));
    },[])

    const refrshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try{
            const response = await api.post('/api/token/refresh/', { refresh: refreshToken });
            if (response.status === 200) {
                const { access } = response.data;
                localStorage.setItem(ACCESS_TOKEN, access);
                setIsAuthenticated(true);
            }else {
                setIsAuthenticated(false);
            }

        }catch (error) {
            console.error('Error refreshing token:', error);
            setIsAuthenticated(false);
        }
    }

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if(!token) {
            setIsAuthenticated(false);
            return;
        }
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
            await refrshToken();
        }else {
            setIsAuthenticated(true);
        }
    }

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;