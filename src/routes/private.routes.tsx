
// import Dashboard from "@/Pages/Dashboard";

import AppLayout from "@/App";
import CreateUser from "@/features/CreateUser/Page";
import Index from "@/features/Dashboard/page";
import UploadForm from "@/features/Upload-Data/page";
import { type RouteObject } from "react-router-dom"; 
import RoleGuard from "./RoleGuard";

export const privateRoutes: RouteObject[] = [
  {
    path: "/",
    element: (
      <AppLayout />
    ),
    children: [
      { path: "uploadData", element: <UploadForm /> },
      { path: "dashboard", element: <Index /> },
      {
        path: "user",
        element: (
          <RoleGuard role="admin">
            <CreateUser />
          </RoleGuard>
        ),
      },
    ],
  },
];
