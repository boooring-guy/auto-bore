"use client";
import {
  CreditCardIcon,
  FolderIcon,
  FolderOpenIcon,
  HomeIcon,
  LayoutDashboardIcon,
  SettingsIcon,
  WorkflowIcon,
  PanelLeftIcon,
  PanelRightIcon,
  LogOutIcon,
  KeyIcon,
  ClockIcon,
  LockIcon,
  StarIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Logo } from "@/components/logo";
import { usePathname, useRouter } from "next/navigation";
import { ProfileButton } from "@/modules/auth";
import { ThemeSwitcher } from "@/components/theme-switcher";

const sidebarItems = [
  {
    title: "Home",
    icon: HomeIcon,
    items: [
      {
        label: " Workflows",
        icon: FolderOpenIcon,
        href: "/workflows",
      },
      {
        label: "Credentials",
        icon: LockIcon,
        href: "/credentials",
      },
      {
        label: "Executions",
        icon: ClockIcon,
        href: "/executions",
      },
    ],
  },
];

export function AppSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="">
        <SidebarMenuItem>
          <SidebarMenuButton asChild className="gap-x-4 h-10 px-4">
            <Link href="/workflows" prefetch>
              <Logo variant="icon" size="sm" />
              <span className="font-medium text-base">Auto_Bore</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarHeader>
      <SidebarContent className="mt-6">
        <ScrollArea>
          {sidebarItems.map((group) => (
            <SidebarGroup key={group.title}>
              <SidebarGroupLabel className="text-sm text-muted-foreground  gap-x-2">
                <group.icon className="size-4 text-muted-foreground" />
                <span>{group.title}</span>
              </SidebarGroupLabel>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.label}
                      isActive={
                        pathname === item.href ||
                        (item.href.startsWith("/") &&
                          pathname.startsWith(item.href))
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        router.push(item.href);
                        router.refresh();
                      }}
                      className="gap-x-2 px-4 h10"
                    >
                      <Link href={item.href}>
                        <item.icon className="size-4  " />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          ))}
        </ScrollArea>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuItem>
          {/* Upgrade to Pro */}
          <SidebarMenuButton
            variant={"default"}
            asChild
            className="gap-x-4 h-10 px-4"
            tooltip={"Upgrade to Pro"}
          >
            <Link href="/upgrade-to-pro">
              <StarIcon className="size-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Upgrade to Pro
              </span>
            </Link>
          </SidebarMenuButton>
          {/* Billing */}
          <SidebarMenuButton
            asChild
            className="gap-x-4 h-10 px-4"
            tooltip={"Billing"}
          >
            <Link href="/billing">
              <CreditCardIcon className="size-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Billing</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        {/* Settings */}
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            className="gap-x-4 h-10 px-4"
            tooltip={"Settings"}
          >
            <Link href="/settings">
              <SettingsIcon className="size-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Settings</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarSeparator />
        {/* Profile and Theme Switcher */}
        <SidebarMenuItem>
          <div
            className={`flex gap-2 ${isCollapsed ? "flex-col" : "flex-row"}`}
          >
            <SidebarMenuButton
              asChild
              className={`gap-x-4 h-10 px-4 ${isCollapsed ? "" : "flex-1"}`}
            >
              <ProfileButton variant="sidebar" />
            </SidebarMenuButton>
            <SidebarMenuButton
              asChild
              className={`gap-x-4 h-10 px-4 ${isCollapsed ? "" : "flex-1"}`}
            >
              <ThemeSwitcher />
            </SidebarMenuButton>
          </div>
        </SidebarMenuItem>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
