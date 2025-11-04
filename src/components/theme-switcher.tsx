"use client";

import * as React from "react";
import { Moon, Sun, Monitor, CheckIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Colored circle component for custom themes
const ThemeCircle = ({ color }: { color: string }) => (
  <div
    className="h-4 w-4 shrink-0 border"
    style={{
      backgroundColor: color,
      borderRadius: "50%",
    }}
  />
);

// Theme color mappings
const themeColors: Record<string, string> = {
  azure: "oklch(0.55 0.22 240)",
  emerald: "oklch(0.55 0.22 150)",
  violet: "oklch(0.55 0.22 280)",
};

type ThemeOption =
  | { value: "light" | "dark" | "system"; label: string; icon: typeof Sun }
  | {
      value: "azure" | "emerald" | "violet";
      label: string;
      icon: null;
      color: string;
    };

const themes: ThemeOption[] = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
  { value: "azure", label: "Azure", icon: null, color: themeColors.azure },
  {
    value: "emerald",
    label: "Emerald",
    icon: null,
    color: themeColors.emerald,
  },
  { value: "violet", label: "Violet", icon: null, color: themeColors.violet },
];

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="w-9 h-9">
        <Sun className="h-4 w-4" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  const currentTheme = themes.find((t) => t.value === theme) || themes[0];
  const CurrentIcon = currentTheme.icon;
  const currentColor = "color" in currentTheme ? currentTheme.color : undefined;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="w-9 h-9 ">
          {CurrentIcon ? (
            <CurrentIcon className="h-4 w-4 border" />
          ) : (
            <ThemeCircle color={currentColor || themeColors.azure} />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        {themes.map((themeOption) => {
          const Icon = themeOption.icon;
          const color = "color" in themeOption ? themeOption.color : undefined;
          return (
            <DropdownMenuItem
              key={themeOption.value}
              onClick={() => setTheme(themeOption.value)}
              className="flex items-center  justify-between gap-2"
            >
              <div className="flex items-center gap-2 ">
                {Icon ? (
                  <Icon className="h-4 w-4" />
                ) : (
                  <ThemeCircle color={color || themeColors.azure} />
                )}
                <span>{themeOption.label}</span>
              </div>
              {theme === themeOption.value && <CheckIcon className="h-4 w-4" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
