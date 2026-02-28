
// import Dashboard from "@/Pages/Dashboard";

import AppLayout from "@/App";
import Index from "@/features/Dashboard/page";
import UploadForm from "@/features/Upload-Data/page";
import { type RouteObject } from "react-router-dom";

export const privateRoutes: RouteObject[] = [
  {
    path: "/",
    element: (
      <AppLayout />
    ),
    children: [
      { path: "uploadData", element: <UploadForm /> },
      { path: "dashboard", element: <Index /> },
      { path: "user", element: <Index /> },
    ],
  },
];
