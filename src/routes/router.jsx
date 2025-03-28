
import SignUp from "../auth/SignUp"
import Layout from "../layout/layout"
import AccountLayout from "../layout/userLayout"
import Dashboard from "../pages/User/Dashboard"
import AdminDashboard from "../pages/admin/AdminDashboard";
import { createBrowserRouter } from "react-router-dom";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [{
            path: "/",
            element: <SignUp />
        },
        {
            path: "/login",
            element: <LoginPage />
        },

        {
            path: "/account",
            element: <AccountLayout />,
            children: [{
                path: "dashboard",
                element: <Dashboard />
            }]
        },

        {
            path: "/admin",
            element: <AdminLayout />,
            children: [
                {
                    path: "dashboard",
                    element: <AdminDashboard />
                }
            ]
        },

        ]

    }






])

export default router;