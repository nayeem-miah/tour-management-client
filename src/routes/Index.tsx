import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/pages/About";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Verify from "@/pages/Verify";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter } from "react-router";
import { adminSidebarItems } from "./AdminSidebarItems";
import { UserSidebarItems } from "./UserSidebarItems";

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
        Component: DashboardLayout,
        path: "/admin",
        children: [
            ...generateRoutes(adminSidebarItems)
        ],
    },
    {
        Component: DashboardLayout,
        path: "/user",
        children: [
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
]);

