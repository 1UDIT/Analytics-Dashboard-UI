import type { RouteObject } from "react-router-dom";
import SignIn from "@/features/auth/pages";

export const publicRoutes: RouteObject[] = [
    { path: "/", element: <SignIn /> },
];
