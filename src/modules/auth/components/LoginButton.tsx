"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { type VariantProps } from "class-variance-authority";

export interface LoginButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * URL to redirect to after login (default: "/login")
   */
  href?: string;
  /**
   * Show login icon
   */
  showIcon?: boolean;
  /**
   * Use Link component instead of router.push
   */
  asLink?: boolean;
  /**
   * Variant of the button
   */
  variant?: "default" | "outline" | "ghost" | "link" | "secondary";
}

/**
 * Button component that redirects to the login page
 *
 * @example
 * ```tsx
 * // Basic usage
 * <LoginButton>Login</LoginButton>
 *
 * // With icon
 * <LoginButton showIcon>Login</LoginButton>
 *
 * // As Link (client-side navigation)
 * <LoginButton asLink>Login</LoginButton>
 *
 * // Custom styling
 * <LoginButton variant="outline" size="lg">
 *   Log In
 * </LoginButton>
 * ```
 */
export function LoginButton({
  href = "/login",
  showIcon = false,
  asLink = false,
  children,
  className,
  variant = "default",
  ...props
}: LoginButtonProps) {
  const router = useRouter();

  if (asLink) {
    return (
      <Button asChild className={cn(className)} {...props}>
        <Link href={href}>
          {showIcon && <LogIn className="mr-2 h-4 w-4" />}
          {children || "Login"}
        </Link>
      </Button>
    );
  }

  return (
    <Button
      onClick={() => router.push(href)}
      className={cn(className)}
      {...props}
    >
      {showIcon && <LogIn className="mr-2 h-4 w-4" />}
      {children || "Login"}
    </Button>
  );
}
