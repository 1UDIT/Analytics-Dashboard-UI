import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState, type ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Upload, Users } from "lucide-react";



const items = [
    {
        title: "Upload Data",
        url: "/uploadData",
        icon: Upload,
    },
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "user",
        url: "/user",
        icon: Users,
    },
];


interface AppSidebarProps {
    children: ReactNode;
}


export function DefaultLayout({ children }: AppSidebarProps) {
    const [name, setName] = useState<string>('Dashboard');

    useEffect(() => {
        locationName();
    }, [location]);

    const locationName = () => {
        switch (location.pathname) {
            case `/user`:
                return setName('User')
            case `/dashBoard`:
                return setName('Dashboard')
            case `/uploadData`:
                return setName('Upload Data')
            default:
                break;
        }
    }

    return (
        <SidebarProvider>
            <Sidebar className="text-base font-medium">
                <div className="flex justify-center items-center py-4">
                    <img
                        src="/img/logo2.png"
                        alt="Logo"
                        className="h-12 w-auto object-contain"
                        loading="lazy"
                    />
                </div>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {items.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <SidebarMenuItem key={item.title}>
                                            <NavLink to={item.url}>
                                                {({ isActive }) => (
                                                    <SidebarMenuButton
                                                        size="lg"
                                                        className={`text-base flex items-center gap-3 transition-all
                                                              ${isActive
                                                                ? "bg-green-200 text-green-900 font-semibold"
                                                                : "text-slate-500 hover:bg-slate-100"
                                                            }`}
                                                    >
                                                        <Icon className="h-5 w-5" />
                                                        <span>{item.title}</span>
                                                    </SidebarMenuButton>
                                                )}
                                            </NavLink>
                                        </SidebarMenuItem>
                                    );
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarHeader />
                <SidebarFooter>
                    <SidebarMenu className="text-white">
                    </SidebarMenu>
                </SidebarFooter>
            </Sidebar>

            {/* Sidebar Inset Content */}
            <SidebarInset className="h-screen flex flex-col">
                <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4  w-full">
                    {/* Sidebar Trigger */}
                    <SidebarTrigger className="ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-full bg-[#727272]" />
                    {name}
                </header>

                <main className="flex-1 flex flex-col">{children}</main>
            </SidebarInset>

        </SidebarProvider>
    )
}