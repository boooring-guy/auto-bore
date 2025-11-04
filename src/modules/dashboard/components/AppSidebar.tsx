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
  Loader2,
  LogInIcon,
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
import { LoginButton, ProfileButton, useUser } from "@/modules/auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { authClient } from "@/lib/auth-client";
import { useHasActiveSubscription } from "@/modules/subscriptions/hooks/useSubscription";

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
  const { isLoading: isLoadingUser, session, user } = useUser();
  const isCollapsed = state === "collapsed";
  const { hasActiveSubscription, isLoading: isLoadingSubscription } =
    useHasActiveSubscription();
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
        {!hasActiveSubscription && !isLoadingSubscription && (
          <SidebarMenuItem>
            {/* Upgrade to Pro */}
            <SidebarMenuButton
              variant={"default"}
              className="gap-x-4 h-10 px-4"
              tooltip={"Upgrade to Pro"}
              onClick={() => {
                authClient.checkout({
                  slug: "pro",
                });
              }}
            >
              <StarIcon className="size-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Upgrade to Pro
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )}

        <SidebarMenuItem>
          {/* Billing */}
          <SidebarMenuButton
            className="gap-x-4 h-10 px-4"
            tooltip={"Billing"}
            onClick={() => {
              authClient.customer.portal();
            }}
          >
            <CreditCardIcon className="size-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Billing</span>
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
              {isLoadingUser && !user ? (
                <div className="flex items-center justify-center rounded-full border border-border bg-background">
                  <Loader2 className="size-4 animate-spin text-muted-foreground" />
                </div>
              ) : user ? (
                <ProfileButton variant="sidebar" />
              ) : (
                <LoginButton variant="default" size="sm">
                  <LogInIcon className="size-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Login</span>
                </LoginButton>
              )}
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
