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
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";
import { ChevronUp, LayoutDashboard, Upload, User2, Users } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useLogout } from "@/hooks/useLogout";


const items = [
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
    const logout = useLogout();
    const userName = sessionStorage.getItem("userName")

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

    const signOut = useCallback(() => { 
        logout();
    }, [])

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
                    <SidebarMenu  >
                        <SidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton className="text-md">
                                        <User2 />  {userName}
                                        <ChevronUp className="ml-auto" />
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent side="top">
                                    <DropdownMenuItem onClick={signOut}>Sign out</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>

            </Sidebar>

            {/* Sidebar Inset Content */}
            <SidebarInset className="flex flex-col">
                <header className="flex h-12 shrink-0 items-center justify-between  gap-2 border-b px-4  w-full">
                    {/* Sidebar Trigger */}
                    <div className="flex items-center gap-2">
                        <SidebarTrigger className="ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-full bg-[#727272]" />
                        {name}
                    </div>
                    <Link to={"/uploadData"} className="text-blue-500 hover:underline">Upload Data</Link>
                </header>

                <div className="flex-1 flex flex-col">{children}</div>
            </SidebarInset>

        </SidebarProvider>
    )
}