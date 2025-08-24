import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/pages/About";
import AddTour from "@/pages/admin/AddTour";
import Analytics from "@/pages/admin/Analytics";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Bookings from "@/pages/user/Bookings";
import Verify from "@/pages/Verify";
import { createBrowserRouter } from "react-router";

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
            {
                Component: Analytics,
                // path: "/admin/analytics"
                path: "analytics"
            },
            {
                Component: AddTour,
                path: "add-tour"
            },
            {
                Component: AddTour,
                path: "add-types"
            },
        ]
    },
    {
        Component: DashboardLayout,
        path: "/user",
        children: [
            {
                Component: Bookings,
                path: "bookings"
            }
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

