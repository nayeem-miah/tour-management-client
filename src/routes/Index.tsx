import App from "@/App";
import About from "@/pages/About";
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

]);




