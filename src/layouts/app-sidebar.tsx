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


const basePath = import.meta.env.BASE_URL;

const items = [

    {
        title: "Dashboard",
        url: "/dashboard",
    },
    {
        title: "User",
        url: "/user",
    }, 
]

 
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
            case `/DriveList`:
                return setName('Drive List')
            case `/Request`:
                return setName('Request List')
            case `/Objects`:
                return setName('Objects List')
            case `/Storage`:
                return setName('Storage')
            case `/Administration/Create`:
                return setName('Create User')
            case `/Administration/Delete`:
                return setName('Delete User')
            case `/Administration/Reset`:
                return setName('Reset Password')
            default:
                break;
        }
    }



    return (
        <SidebarProvider>
            <Sidebar className="text-base font-medium">
                {/* Logo */}
                <div className="block m-auto p-auto pt-2">
                    <img
                        src={`${basePath}img/Logo.png`}
                        alt="logo"
                        style={{ width: "100%", height: "65px" }}
                        loading="lazy"
                        onError={(e) => {
                            const fallbackSrc = `${basePath}img/logo.png`;
                            const transparent = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";

                            if (!e.currentTarget.src.endsWith("logo.png")) {
                                e.currentTarget.src = fallbackSrc;
                            } else {
                                e.currentTarget.src = transparent; // keeps space stable, no flicker
                            }
                        }}

                    />

                </div>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            size="lg"
                                            className="text-xl"
                                            variant={location.pathname === item.url ? "outline" : "default"}
                                        >
                                            <NavLink
                                                to={item.url} className={"text-white"}>
                                                <span>{item.title}</span>
                                            </NavLink>

                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarHeader />
                {/* Sidebar Footer - Admin Dropdown */}
                <SidebarFooter>
                    <SidebarMenu className="text-white">
                    </SidebarMenu>
                </SidebarFooter>
            </Sidebar>

            {/* Sidebar Inset Content */}
            <SidebarInset className="h-screen flex flex-col overflow-hidden">
                <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4  w-full">
                    {/* Sidebar Trigger */}
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-full bg-[#727272]" />
                </header>

                <main className="flex-1 flex flex-col   overflow-hidden">{children}</main>
            </SidebarInset>

        </SidebarProvider>
    )
}