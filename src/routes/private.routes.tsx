
// import Dashboard from "@/Pages/Dashboard";

import AppLayout from "@/App";
import Index from "@/features/Dashboard/page";
import { type RouteObject } from "react-router-dom";

export const privateRoutes: RouteObject[] = [
  {
    path: "/",
    element: (
      <AppLayout />
    ),
    children: [
      { path: "dashboard", element: <Index /> },
      { path: "users", element: <Index /> },
    ],
  },
];
