import { Plus, User, LogOut, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/app/components/sidebar";
import { SignedIn, UserButton } from "@clerk/nextjs";

// Menu items.
const mainItems = [
  {
    title: "My Jobs",
    url: "/jobs/my-jobs",
    icon: User,
  },
  {
    title: "Create Job",
    url: "/jobs/create",
    icon: Plus,
  },
];

const bottomItems = [
  {
    title: "Profile",
    url: "/profile",
    icon: Settings,
  },
  {
    title: "Log Out",
    url: "#",
    icon: LogOut,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="flex flex-col h-full justify-between border-none overflow-hidden">
        {" "}
        {/* Ensure no border and prevent overflow */}
        {/* Top Section */}
        <div>
          <SidebarGroup>
            <SidebarGroupLabel>
              <div className="font-bold text-xl">
                <span className="text-blue-700 my-10">Skills</span>Connect
              </div>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {mainItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
        {/* Bottom Section */}
        <div className="pb-4">
          <SidebarGroupContent>
            <SidebarMenu>
              {bottomItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SignedIn>
                <UserButton />
              </SignedIn>
            </SidebarMenu>
          </SidebarGroupContent>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
