import { RouteObject } from "react-router-dom";
import ProtectedRoute from "@/Pages/ProtectedRoute/ProtectedRoute";
import ProtectedLayout from "@/Pages/ProtectedLayout"; // has <Outlet/> + idle logout etc.
// import Dashboard from "@/Pages/Dashboard";

export const privateRoutes: RouteObject[] = [
  {
    path: "/app",
    element: (
      <ProtectedRoute>
        <ProtectedLayout />
      </ProtectedRoute>
    ),
    children: [
      // { index: true, element: <Dashboard /> },
      // { path: "users", element: <Users /> },
    ],
  },
];
