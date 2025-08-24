import AddTour from "@/pages/admin/AddTour";
import Analytics from "@/pages/admin/Analytics";
import type { ISidebarItems } from "@/types";

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
                component: AddTour
            },
            {
                title: "Add tour",
                url: "/admin/add-tour",
                component: AddTour
            }
        ],
    },
]