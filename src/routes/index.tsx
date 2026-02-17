import { createBrowserRouter } from "react-router-dom";
import { publicRoutes } from "./public.routes";
// import { privateRoutes } from "./private.routes";

const basePath = import.meta.env.BASE_URL;

export const router = createBrowserRouter(
  [...publicRoutes],
  { basename: basePath }
);
