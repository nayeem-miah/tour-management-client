import Bookings from "@/pages/user/Bookings";
import type { ISidebarItems } from "@/types";

export const UserSidebarItems: ISidebarItems[] = [
    {
        title: "Dashboard",
        items: [
            {
                title: "Bookings",
                url: "/user/bookings",
                component: Bookings
            }
        ],
    }
]