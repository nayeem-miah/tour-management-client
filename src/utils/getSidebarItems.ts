import { role } from "@/constants/role";
import { adminSidebarItems } from "@/routes/AdminSidebarItems";
import { UserSidebarItems } from "@/routes/UserSidebarItems";
import type { TRole } from "@/types";

export const getSidebarItems = (userRole: TRole) => {
    switch (userRole) {
        case role.superAdmin:
            return [...adminSidebarItems];

        case role.admin:
            return [...adminSidebarItems];

        case role.user:
            return [...UserSidebarItems];


        default:
            return [];
    }
}