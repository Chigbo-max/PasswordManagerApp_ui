import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../auth/LoginPage";
import LandingPage from "../pages/LandingPage";
import AdminLayout from "../layout/adminLayout";
import SignUp from "../auth/SignUp";
import Layout from "../layout/layout";
import AccountLayout from "../layout/userLayout";
import Dashboard from "../pages/User/Dashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";
import ResetPassword from "../auth/ResetPassword";
import ProtectedRoute from "../components/ProtectedRoute"; 

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <LandingPage />,
            },
            {
                path: "signup",
                element: <SignUp />,
            },
            {
                path: "login",
                element: <LoginPage />,
            },
            {
                path: "reset-password",
                element: <ResetPassword />,
            },
            {
                path: "/account",
                element: (
                    <ProtectedRoute allowedRole="user">
                        <AccountLayout />
                    </ProtectedRoute>
                ),
                children: [
                    {
                        path: "dashboard",
                        element: <Dashboard />,
                    },
                ],
            },
            {
                path: "/admin",
                element: (
                    <ProtectedRoute allowedRole="admin">
                        <AdminLayout />
                    </ProtectedRoute>
                ),
                children: [
                    {
                        path: "dashboard",
                        element: <AdminDashboard />,
                    },
                ],
            },
        ],
    },
]);

export default router;