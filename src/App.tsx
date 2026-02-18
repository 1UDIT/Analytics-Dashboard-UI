import { Outlet } from "react-router-dom";
import { DefaultLayout } from "./layouts/app-sidebar";
import { SidebarProvider } from "./components/ui/sidebar";

export default function AppLayout() {
  return (
    <SidebarProvider>
      <DefaultLayout >
        <main>
          <Outlet />
        </main>
      </DefaultLayout>
    </SidebarProvider>
  );
}
