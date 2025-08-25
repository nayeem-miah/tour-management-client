import AddTour from "@/pages/admin/AddTour";
import AddTourTypes from "@/pages/admin/AddTourTypes";

import type { ISidebarItems } from "@/types";
import { lazy } from "react";

// import Analytics from "@/pages/admin/Analytics";
const Analytics = lazy(() => import("@/pages/admin/Analytics"))

export const adminSidebarItems: ISidebarItems[] = [
    {
        title: "Dashboard",
        items: [
            {
                title: "Analytics",
                url: "/admin/analytics",
                component: Analytics
            }
        ],
    },
    {
        title: "Tour Management",
        items: [
            {
                title: "Add tour type",
                url: "/admin/add-tour-type",
                component: AddTourTypes
            },
            {
                title: "Add tour",
                url: "/admin/add-tour",
                component: AddTour
            }
        ],
    },
]