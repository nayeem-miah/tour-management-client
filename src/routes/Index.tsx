import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/pages/About";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Verify from "@/pages/Verify";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./AdminSidebarItems";
import { UserSidebarItems } from "./UserSidebarItems";
import { withAuth } from "@/utils/WithAuth";
import Unauthorized from "@/pages/Unauthorized";
import { role } from "@/constants/role";
import type { TRole } from "@/types";

export const router = createBrowserRouter([
    {
        Component: App,
        path: "/",
        children: [
            {
                path: "about",
                Component: About
            }
        ]
    },

    {
        Component: withAuth(DashboardLayout, role.superAdmin as TRole),
        path: "/admin",
        children: [
            { index: true, element: <Navigate to={"/admin/analytics"} /> },
            ...generateRoutes(adminSidebarItems)
        ],
    },
    {
        Component: withAuth(DashboardLayout, role.user as TRole),
        path: "/user",
        children: [
            { index: true, element: <Navigate to={"/user/bookings"} /> },
            ...generateRoutes(UserSidebarItems)
        ]
    },

    {
        Component: Login,
        path: "/login"
    },
    {
        Component: Register,
        path: "/register"
    },
    {
        Component: Verify,
        path: "/verify"
    },
    {
        Component: Unauthorized,
        path: "/unauthorized"
    },
]);

