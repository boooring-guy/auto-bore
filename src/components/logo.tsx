"use client";

import * as React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export type LogoVariant = "icon" | "full";
export type LogoSize = "sm" | "md" | "lg" | "xl" | "responsive";

export interface LogoProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof Image>,
    "src" | "alt" | "width" | "height"
  > {
  /**
   * Variant of the logo: "icon" for icon only, "full" for full logo with text
   * @default "icon"
   */
  variant?: LogoVariant;
  /**
   * Size of the logo. Can be a predefined size or "responsive" for responsive sizing
   * @default "md"
   */
  size?: LogoSize;
  /**
   * Whether to use the colored variant (if available)
   * @default false
   */
  useColor?: boolean;
  /**
   * Additional className for styling
   */
  className?: string;
  /**
   * Optional alt text (defaults to "Auto_bore Logo" or "Auto_bore Full Logo")
   */
  alt?: string;
  /**
   * Optional src override (not recommended - use variant and useColor instead)
   */
  src?: string;
  /**
   * Optional width override (not recommended - use size prop instead)
   */
  width?: number;
  /**
   * Optional height override (not recommended - use size prop instead)
   */
  height?: number;
}

const sizeMap: Record<
  LogoSize,
  { width: number; height: number; className?: string }
> = {
  sm: { width: 24, height: 24, className: "w-6 h-6" },
  md: { width: 32, height: 32, className: "w-8 h-8" },
  lg: { width: 48, height: 48, className: "w-12 h-12" },
  xl: { width: 64, height: 64, className: "w-16 h-16" },
  responsive: {
    width: 32,
    height: 32,
    className: "w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12",
  },
};

const fullSizeMap: Record<
  LogoSize,
  { width: number; height: number; className?: string }
> = {
  sm: { width: 80, height: 80, className: "w-20 h-20" },
  md: { width: 120, height: 120, className: "w-[120px] h-[120px]" },
  lg: { width: 160, height: 160, className: "w-40 h-40" },
  xl: { width: 200, height: 200, className: "w-[200px] h-[200px]" },
  responsive: {
    width: 120,
    height: 120,
    className: "w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48",
  },
};

export function Logo({
  variant = "icon",
  size = "md",
  useColor = false,
  className,
  src: _src,
  width: _width,
  height: _height,
  alt: _alt,
  ...props
}: LogoProps) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Determine the actual theme (resolvedTheme is the actual theme when using "system")
  const actualTheme = resolvedTheme || theme || "light";
  const isDark = actualTheme === "dark";

  // Get logo source based on variant and theme
  const getLogoSrc = () => {
    if (variant === "icon") {
      if (useColor) {
        return "/logos/logo-icon-color.svg";
      }
      // For icon: use white logo in dark mode, default logo in light mode
      return isDark ? "/logos/logo-icon-light.svg" : "/logos/logo-icon.svg";
    } else {
      if (useColor) {
        return "/logos/logo-full.svg";
      } else {
        // For full: use light variant in light mode, default in dark mode
        return isDark ? "/logos/logo-full.svg" : "/logos/logo-full-light.svg";
      }
    }
  };
  // Get size configuration
  const sizeConfig = variant === "icon" ? sizeMap[size] : fullSizeMap[size];

  const altText = variant === "icon" ? "Auto_bore Logo" : "Auto_bore Full Logo";

  // Show a placeholder during SSR to avoid hydration mismatch
  if (!mounted) {
    return (
      <Image
        src={getLogoSrc()}
        alt={_alt || altText}
        width={sizeConfig.width}
        height={sizeConfig.height}
        className={cn(sizeConfig.className, className)}
        {...props}
      />
    );
  }

  return (
    <Image
      src={getLogoSrc()}
      alt={_alt || altText}
      width={sizeConfig.width}
      height={sizeConfig.height}
      className={cn(sizeConfig.className, className)}
      {...props}
    />
  );
}
