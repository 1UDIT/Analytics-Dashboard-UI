import { Outlet } from "react-router-dom";
import { DefaultLayout } from "./layouts/app-sidebar";
import { SidebarProvider } from "./components/ui/sidebar";

export default function AppLayout() {
  return (
    <SidebarProvider className=''>
      <DefaultLayout >
        <Outlet />
      </DefaultLayout>
    </SidebarProvider>
  );
}
