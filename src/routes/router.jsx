import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../auth/LoginPage";
import LandingPage from "../components/LandingPage";
import AdminLayout from "../layout/adminLayout";
import SignUp from "../auth/SignUp";
import Layout from "../layout/layout";
import AccountLayout from "../layout/userLayout";
import Dashboard from "../pages/User/Dashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";
import ResetPassword from "../auth/ResetPassword";
import ForgetPassword from "../auth/ForgetPassword"
import ProtectedRoute from "../components/ProtectedRoute";
import ActivateAccount from "../pages/admin/ActivateAccount";
import SuspendAccount from "../pages/admin/SuspendAccount";
import CloseAccount from "../pages/admin/CloseAccount";
import ViewUsers from "../pages/admin/ViewUsers";
import ViewAuditLogs from "../pages/admin/ViewAuditLogs";
import SaveCredentials from '../pages/User/SaveCredentials';
import ViewCredentials from '../pages/User/ViewCredentials';

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
                path: "forget-password",
                element: <ForgetPassword />,
            },
            {
                path: "/account",
                element:
                    // <ProtectedRoute allowedRole="user">
                        <AccountLayout />,
                    // </ProtectedRoute>,

                children: [
                    {
                        path: "dashboard",
                        element: <Dashboard />,
                    },

                    {
                        path: "save-credentials",
                        element: <SaveCredentials />
                    },
                    {
                        path: "view-credentials",
                        element: <ViewCredentials />
                    }
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
                    {
                        path: "activate-account",
                        element: <ActivateAccount />,
                    },
                    {
                        path: "suspend-account",
                        element: <SuspendAccount />,
                    },
                    {
                        path: "close-account",
                        element: <CloseAccount />,
                    },
                    {
                        path: "view-users",
                        element: <ViewUsers />,
                    },
                    {
                        path: "view-audit-logs",
                        element: <ViewAuditLogs />,
                    }
                ],
            },
        ],
    },
]);

export default router;