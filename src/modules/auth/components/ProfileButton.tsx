"use client";

import { useState } from "react";
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
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <LogOut className="size-4 text-destructive" />
      )}
      <span>{isLoading ? "Signing out..." : "Sign out"}</span>
    </DropdownMenuItem>
  );
}

export function ProfileButton({
  className,
  size = "default",
  showUserInfo = true,
  customMenuItems = [],
  menuItems = {
    profile: true,
    settings: true,
    billing: true,
    help: true,
  },
}: ProfileButtonProps) {
  const { user, isLoading } = useUser();
  const router = useRouter();

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
                  {item.icon || <User className="size-4" />}
                  <span>{item.label}</span>
                </DropdownMenuItem>
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

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <SignOutMenuItem />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
