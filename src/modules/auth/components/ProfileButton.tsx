"use client";

import { useState, Fragment, useEffect, useRef } from "react";
import { useUser } from "../hooks/useUser";
import { authClient } from "@/lib/auth-client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  Settings,
  CreditCard,
  HelpCircle,
  LogOut,
  ChevronUp,
  ChevronDown,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export interface ProfileButtonProps {
  /**
   * Custom className for the trigger button
   */
  className?: string;
  /**
   * Size of the avatar (default: "default")
   */
  size?: "sm" | "default" | "lg";
  /**
   * Display variant - "default" shows avatar button, "sidebar" shows horizontal button with user info
   */
  variant?: "default" | "sidebar";
  /**
   * Show user name and email in the dropdown header
   */
  showUserInfo?: boolean;
  /**
   * Custom menu items to add before the default items
   */
  customMenuItems?: Array<{
    label: string;
    icon?: React.ReactNode;
    href?: string;
    onClick?: () => void;
    variant?: "default" | "destructive";
  }>;
  /**
   * Custom React component buttons to render in the menu
   * These will be rendered after customMenuItems but before default menu items
   */
  customMenuComponents?: React.ReactNode[];
  /**
   * Custom React component buttons to render after default menu items but before sign out
   */
  customMenuComponentsAfter?: React.ReactNode[];
  /**
   * Menu items to include (default: all)
   */
  menuItems?: {
    profile?: boolean;
    settings?: boolean;
    billing?: boolean;
    help?: boolean;
  };
}

/**
 * Profile Button component with dropdown menu
 *
 * Styled like Vercel's profile menu with user info, settings, and sign out
 *
 * @example
 * ```tsx
 * // Basic usage
 * <ProfileButton />
 *
 * // Custom size
 * <ProfileButton size="lg" />
 *
 * // Custom menu items
 * <ProfileButton
 *   customMenuItems={[
 *     { label: "Dashboard", href: "/dashboard", icon: <LayoutDashboard /> }
 *   ]}
 * />
 *
 * // Without user info
 * <ProfileButton showUserInfo={false} />
 *
 * // Sidebar variant - horizontal button with user info
 * <ProfileButton variant="sidebar" />
 *
 * // With custom React component buttons
 * <ProfileButton
 *   customMenuComponents={[
 *     <DropdownMenuItem key="custom1" onClick={() => console.log("Custom")}>
 *       <CustomIcon className="size-4" />
 *       <span>Custom Action</span>
 *     </DropdownMenuItem>
 *   ]}
 * />
 * ```
 */
function SignOutMenuItem() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const result = await authClient.signOut();

      if (result.error) {
        toast.error(result.error.message || "Failed to sign out");
        return;
      }

      toast.success("Signed out successfully");
      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DropdownMenuItem
      onClick={handleSignOut}
      disabled={isLoading}
      className="w-full cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10 dark:focus:bg-destructive/20"
    >
      {isLoading ? (
        <Loader2 className="size-4 animate-spin text-current" />
      ) : (
        <LogOut className="size-4 text-current" />
      )}
      <span>{isLoading ? "Signing out..." : "Sign out"}</span>
    </DropdownMenuItem>
  );
}

export function ProfileButton({
  className,
  size = "default",
  variant = "default",
  showUserInfo = true,
  customMenuItems = [],
  customMenuComponents = [],
  customMenuComponentsAfter = [],
  menuItems = {
    profile: true,
    settings: true,
    billing: true,
    help: true,
  },
}: ProfileButtonProps) {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const avatarSize = {
    sm: "size-7",
    default: "size-8",
    lg: "size-10",
  }[size];

  const getInitials = (name?: string | null, email?: string | null) => {
    if (name) {
      const parts = name.trim().split(" ");
      if (parts.length >= 2) {
        return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
      }
      return name[0]?.toUpperCase() || "";
    }
    if (email) {
      return email[0]?.toUpperCase() || "";
    }
    return "U";
  };

  const handleMenuItemClick = (href?: string, onClick?: () => void) => {
    if (onClick) {
      onClick();
    }
    if (href) {
      router.push(href);
    }
  };

  // Check if sidebar is collapsed by looking at parent data attributes
  useEffect(() => {
    if (variant !== "sidebar") return;

    const checkCollapsed = () => {
      // Look for the sidebar container with data-state attribute
      const sidebarContainer = document.querySelector('[data-slot="sidebar"]');
      if (sidebarContainer) {
        const isCollapsedState =
          sidebarContainer.getAttribute("data-state") === "collapsed";
        setIsCollapsed(isCollapsedState);
      }
    };

    // Check immediately
    checkCollapsed();

    // Set up observer to watch for state changes
    const observer = new MutationObserver(checkCollapsed);
    const sidebarContainer = document.querySelector('[data-slot="sidebar"]');
    if (sidebarContainer) {
      observer.observe(sidebarContainer, {
        attributes: true,
        attributeFilter: ["data-state"],
      });
    }

    // Also check periodically as a fallback
    const interval = setInterval(checkCollapsed, 100);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, [variant]);

  if (isLoading) {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-full border border-border bg-background",
          avatarSize,
          className
        )}
      >
        <Loader2 className="size-4 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const displayName = user.name || user.email?.split("@")[0] || "User";
  const userEmail = user.email || "";

  // Sidebar variant: horizontal button with avatar, name, email, and chevron
  // When collapsed, show only the avatar
  if (variant === "sidebar") {
    if (isCollapsed) {
      // Collapsed state: show only avatar button
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              ref={buttonRef}
              className={cn(
                "relative flex items-center justify-center rounded-full border border-border bg-background transition-all hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                avatarSize,
                className
              )}
              aria-label="User menu"
            >
              <Avatar className={cn("size-full", avatarSize)}>
                {user.image && (
                  <AvatarImage src={user.image} alt={displayName} />
                )}
                <AvatarFallback className="bg-muted text-muted-foreground text-xs font-medium">
                  {getInitials(user.name, user.email)}
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56" sideOffset={8}>
            {showUserInfo && (
              <>
                <div className="px-2 py-1.5">
                  <div className="flex items-center gap-2 px-2 py-1.5">
                    <Avatar className="size-8 hover:shadow-md transition-all">
                      {user.image && (
                        <AvatarImage src={user.image} alt={displayName} />
                      )}
                      <AvatarFallback className="bg-muted text-muted-foreground text-xs font-medium">
                        {getInitials(user.name, user.email)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">
                        {displayName}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {userEmail}
                      </p>
                    </div>
                  </div>
                </div>
                <DropdownMenuSeparator />
              </>
            )}

            {customMenuItems.length > 0 && (
              <>
                <DropdownMenuGroup>
                  {customMenuItems.map((item, index) => (
                    <DropdownMenuItem
                      key={index}
                      variant={item.variant}
                      onClick={() =>
                        handleMenuItemClick(item.href, item.onClick)
                      }
                      className="hover:bg-accent hover:text-accent-foreground"
                    >
                      {item.icon || <User className="size-4 text-current" />}
                      <span>{item.label}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
                {(menuItems.profile ||
                  menuItems.settings ||
                  menuItems.billing ||
                  menuItems.help ||
                  customMenuComponents.length > 0) && <DropdownMenuSeparator />}
              </>
            )}

            {customMenuComponents.length > 0 && (
              <>
                <DropdownMenuGroup>
                  {customMenuComponents.map((component, index) => (
                    <Fragment key={index}>{component}</Fragment>
                  ))}
                </DropdownMenuGroup>
                {(menuItems.profile ||
                  menuItems.settings ||
                  menuItems.billing ||
                  menuItems.help) && <DropdownMenuSeparator />}
              </>
            )}

            <DropdownMenuGroup>
              {menuItems.profile && (
                <DropdownMenuItem
                  onClick={() => handleMenuItemClick("/profile")}
                >
                  <User className="size-4 text-current" />
                  <span>Profile</span>
                </DropdownMenuItem>
              )}
              {menuItems.settings && (
                <DropdownMenuItem
                  onClick={() => handleMenuItemClick("/settings")}
                >
                  <Settings className="size-4 text-current" />
                  <span>Settings</span>
                </DropdownMenuItem>
              )}
              {menuItems.billing && (
                <DropdownMenuItem
                  onClick={() => handleMenuItemClick("/billing")}
                >
                  <CreditCard className="size-4 text-current" />
                  <span>Billing</span>
                </DropdownMenuItem>
              )}
              {menuItems.help && (
                <DropdownMenuItem onClick={() => handleMenuItemClick("/help")}>
                  <HelpCircle className="size-4 text-current" />
                  <span>Help & Support</span>
                </DropdownMenuItem>
              )}
            </DropdownMenuGroup>

            {customMenuComponentsAfter.length > 0 && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {customMenuComponentsAfter.map((component, index) => (
                    <Fragment key={index}>{component}</Fragment>
                  ))}
                </DropdownMenuGroup>
              </>
            )}

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <SignOutMenuItem />
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    // Expanded state: show full horizontal button
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            ref={buttonRef}
            className={cn(
              "flex w-full items-center gap-2 overflow-hidden rounded-md px-2 py-1.5 text-left text-sm outline-hidden transition-all hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              className
            )}
            aria-label="User menu"
          >
            <Avatar className={cn("shrink-0", avatarSize)}>
              {user.image && <AvatarImage src={user.image} alt={displayName} />}
              <AvatarFallback className="bg-muted text-muted-foreground text-xs font-medium">
                {getInitials(user.name, user.email)}
              </AvatarFallback>
            </Avatar>
            <div className="flex min-w-0 flex-1 flex-col truncate">
              <p className="truncate text-sm font-medium">{displayName}</p>
              <p className="truncate text-xs text-muted-foreground">
                {userEmail}
              </p>
            </div>
            <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56" sideOffset={8}>
          {showUserInfo && (
            <>
              <div className="px-2 py-1.5">
                <div className="flex items-center gap-2 px-2 py-1.5">
                  <Avatar className="size-8 hover:shadow-md transition-all">
                    {user.image && (
                      <AvatarImage src={user.image} alt={displayName} />
                    )}
                    <AvatarFallback className="bg-muted text-muted-foreground text-xs font-medium">
                      {getInitials(user.name, user.email)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">
                      {displayName}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {userEmail}
                    </p>
                  </div>
                </div>
              </div>
              <DropdownMenuSeparator />
            </>
          )}

          {customMenuItems.length > 0 && (
            <>
              <DropdownMenuGroup>
                {customMenuItems.map((item, index) => (
                  <DropdownMenuItem
                    key={index}
                    variant={item.variant}
                    onClick={() => handleMenuItemClick(item.href, item.onClick)}
                  >
                    {item.icon || <User className="size-4 text-current" />}
                    <span>{item.label}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
              {(menuItems.profile ||
                menuItems.settings ||
                menuItems.billing ||
                menuItems.help ||
                customMenuComponents.length > 0) && <DropdownMenuSeparator />}
            </>
          )}

          {customMenuComponents.length > 0 && (
            <>
              <DropdownMenuGroup>
                {customMenuComponents.map((component, index) => (
                  <Fragment key={index}>{component}</Fragment>
                ))}
              </DropdownMenuGroup>
              {(menuItems.profile ||
                menuItems.settings ||
                menuItems.billing ||
                menuItems.help) && <DropdownMenuSeparator />}
            </>
          )}

          <DropdownMenuGroup>
            {menuItems.profile && (
              <DropdownMenuItem onClick={() => handleMenuItemClick("/profile")}>
                <User className="size-4 text-current" />
                <span>Profile</span>
              </DropdownMenuItem>
            )}
            {menuItems.settings && (
              <DropdownMenuItem
                onClick={() => handleMenuItemClick("/settings")}
              >
                <Settings className="size-4 text-current" />
                <span>Settings</span>
              </DropdownMenuItem>
            )}
            {menuItems.billing && (
              <DropdownMenuItem onClick={() => handleMenuItemClick("/billing")}>
                <CreditCard className="size-4 text-current" />
                <span>Billing</span>
              </DropdownMenuItem>
            )}
            {menuItems.help && (
              <DropdownMenuItem onClick={() => handleMenuItemClick("/help")}>
                <HelpCircle className="size-4 text-current" />
                <span>Help & Support</span>
              </DropdownMenuItem>
            )}
          </DropdownMenuGroup>

          {customMenuComponentsAfter.length > 0 && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {customMenuComponentsAfter.map((component, index) => (
                  <Fragment key={index}>{component}</Fragment>
                ))}
              </DropdownMenuGroup>
            </>
          )}

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <SignOutMenuItem />
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // Default variant: circular avatar button
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "relative flex items-center justify-center rounded-full border border-border bg-background transition-all hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            avatarSize,
            className
          )}
          aria-label="User menu"
        >
          <Avatar className={cn("size-full", avatarSize)}>
            {user.image && <AvatarImage src={user.image} alt={displayName} />}
            <AvatarFallback className="bg-muted text-muted-foreground text-xs font-medium">
              {getInitials(user.name, user.email)}
            </AvatarFallback>
          </Avatar>
          <ChevronUp className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full bg-background border border-border text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56" sideOffset={8}>
        {showUserInfo && (
          <>
            <div className="px-2 py-1.5">
              <div className="flex items-center gap-2 px-2 py-1.5">
                <Avatar className="size-8 hover:shadow-md transition-all">
                  {user.image && (
                    <AvatarImage src={user.image} alt={displayName} />
                  )}
                  <AvatarFallback className="bg-muted text-muted-foreground text-xs font-medium">
                    {getInitials(user.name, user.email)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">{displayName}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {userEmail}
                  </p>
                </div>
              </div>
            </div>
            <DropdownMenuSeparator />
          </>
        )}

        {customMenuItems.length > 0 && (
          <>
            <DropdownMenuGroup>
              {customMenuItems.map((item, index) => (
                <DropdownMenuItem
                  key={index}
                  variant={item.variant}
                  onClick={() => handleMenuItemClick(item.href, item.onClick)}
                >
                  {item.icon || <User className="size-4 text-current" />}
                  <span>{item.label}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            {(menuItems.profile ||
              menuItems.settings ||
              menuItems.billing ||
              menuItems.help ||
              customMenuComponents.length > 0) && <DropdownMenuSeparator />}
          </>
        )}

        {customMenuComponents.length > 0 && (
          <>
            <DropdownMenuGroup>
              {customMenuComponents.map((component, index) => (
                <Fragment key={index}>{component}</Fragment>
              ))}
            </DropdownMenuGroup>
            {(menuItems.profile ||
              menuItems.settings ||
              menuItems.billing ||
              menuItems.help) && <DropdownMenuSeparator />}
          </>
        )}

        <DropdownMenuGroup>
          {menuItems.profile && (
            <DropdownMenuItem onClick={() => handleMenuItemClick("/profile")}>
              <User className="size-4" />
              <span>Profile</span>
            </DropdownMenuItem>
          )}
          {menuItems.settings && (
            <DropdownMenuItem onClick={() => handleMenuItemClick("/settings")}>
              <Settings className="size-4" />
              <span>Settings</span>
            </DropdownMenuItem>
          )}
          {menuItems.billing && (
            <DropdownMenuItem onClick={() => handleMenuItemClick("/billing")}>
              <CreditCard className="size-4" />
              <span>Billing</span>
            </DropdownMenuItem>
          )}
          {menuItems.help && (
            <DropdownMenuItem onClick={() => handleMenuItemClick("/help")}>
              <HelpCircle className="size-4" />
              <span>Help & Support</span>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>

        {customMenuComponentsAfter.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {customMenuComponentsAfter.map((component, index) => (
                <Fragment key={index}>{component}</Fragment>
              ))}
            </DropdownMenuGroup>
          </>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <SignOutMenuItem />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
