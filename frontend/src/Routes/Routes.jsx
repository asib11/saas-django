import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";

// eslint-disable-next-line react-refresh/only-export-components
const Logout = () => {
    localStorage.clear();
    return <Navigate to="/login" />;
}

// eslint-disable-next-line react-refresh/only-export-components
const RegisterAndLogin = () => {
    localStorage.clear();
    return <Register />;
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedRoute> <Home/> </ProtectedRoute>,
    },
    {
        path: "/login",
        element: <Login/>,
    },
    {
        path: "/register",
        element: <RegisterAndLogin/>,
    },
    {
        path: "/logout",
        element: <Logout/>,
    },
    {
        path:'*',
        element: <NotFound/>
    }
]);

export default router