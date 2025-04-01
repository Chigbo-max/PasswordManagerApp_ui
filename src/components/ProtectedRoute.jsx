import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRole }) => {
    // const token = localStorage.getItem('token');
    // const role = localStorage.getItem('role');

    // if (!token) {
    //     return <Navigate to="/logIn" replace />;
    // }

    // if (role !== allowedRole) {
    //     if (role === "admin") {
    //         return <Navigate to="/admin/dashboard" replace />;
    //     } else {
    //         return <Navigate to="/account/dashboard" replace />;
    //     }
    // }

    // return <Outlet />;
};

export default ProtectedRoute;