"use client"

import * as React from "react"
import { Moon, Sun, Monitor, CheckIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

// Colored circle component for custom themes
const ThemeCircle = ({ color }: { color: string }) => (
  <div
    className="h-4 w-4 shrink-0 border"
    style={{
      backgroundColor: color,
      borderRadius: "50%",
    }}
  />
)

// Theme color mappings
const themeColors: Record<string, string> = {
  azure: "oklch(0.55 0.22 240)",
  emerald: "oklch(0.55 0.22 150)",
  violet: "oklch(0.55 0.22 280)",
  fuchsia: "oklch(0.65 0.22 350)",
}

type Mode = "light" | "dark" | "system"
type ColorTheme = "azure" | "emerald" | "violet" | "fuchsia"

const colorThemes: ColorTheme[] = ["azure", "emerald", "violet", "fuchsia"]

export function ThemeSwitcher() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [open, setOpen] = React.useState(false)

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Parse current theme to extract mode and color theme
  const getCurrentMode = (): Mode => {
    if (!mounted) return "system"
    if (theme === "light" || theme === "dark" || theme === "system") {
      return theme
    }
    // If it's a color theme, check if it ends with -dark
    if (theme?.endsWith("-dark")) {
      return "dark"
    }
    // Otherwise, check resolved theme for system preference
    if (resolvedTheme === "dark") {
      return "dark"
    }
    return "light"
  }

  const getCurrentColorTheme = (): ColorTheme | null => {
    if (!mounted) return null
    if (theme === "light" || theme === "dark" || theme === "system") {
      return null
    }
    // Remove -dark suffix if present
    const baseTheme = theme?.replace("-dark", "")
    if (baseTheme && baseTheme in themeColors) {
      return baseTheme as ColorTheme
    }
    return null
  }

  const currentMode = getCurrentMode()
  const currentColorTheme = getCurrentColorTheme()

  // Handle mode change
  const handleModeChange = (mode: Mode) => {
    if (currentColorTheme) {
      // If a color theme is selected, combine with mode
      if (mode === "system") {
        setTheme("system")
      } else if (mode === "dark") {
        setTheme(`${currentColorTheme}-dark`)
      } else {
        setTheme(currentColorTheme)
      }
    } else {
      // No color theme, just set mode
      setTheme(mode)
    }
  }

  // Handle color theme change
  const handleColorThemeChange = (colorTheme: ColorTheme | null) => {
    if (currentMode === "system") {
      // For system mode, use the base theme and let system preference handle dark/light
      setTheme(colorTheme || "system")
    } else if (currentMode === "dark") {
      // For dark mode, add -dark suffix
      setTheme(colorTheme ? `${colorTheme}-dark` : "dark")
    } else {
      // For light mode, use base theme
      setTheme(colorTheme || "light")
    }
  }

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="w-9 h-9">
        <Sun className="h-4 w-4" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  // Determine icon/color for trigger button
  const getTriggerDisplay = () => {
    if (currentColorTheme && currentColorTheme in themeColors) {
      return <ThemeCircle color={themeColors[currentColorTheme]} />
    }
    if (currentMode === "dark" || resolvedTheme === "dark") {
      return <Moon className="h-4 w-4" />
    }
    return <Sun className="h-4 w-4" />
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="w-9 h-9">
          {getTriggerDisplay()}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0">
        <div className="p-4">
          <Tabs
            value={currentMode}
            onValueChange={(value) => handleModeChange(value as Mode)}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="light" className="flex items-center gap-2">
                <Sun className="h-4 w-4" />
                <span>Light</span>
              </TabsTrigger>
              <TabsTrigger value="dark" className="flex items-center gap-2">
                <Moon className="h-4 w-4" />
                <span>Dark</span>
              </TabsTrigger>
              <TabsTrigger value="system" className="flex items-center gap-2">
                <Monitor className="h-4 w-4" />
                <span>System</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value={currentMode} className="mt-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Choose Theme
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {/* Default theme option */}
                  <button
                    onClick={() => {
                      handleColorThemeChange(null)
                      setOpen(false)
                    }}
                    className={cn(
                      "flex items-center justify-center gap-2 rounded-lg border-2 p-3 transition-all hover:bg-accent",
                      currentColorTheme === null
                        ? "border-primary bg-accent"
                        : "border-border"
                    )}
                  >
                    <span className="text-sm font-medium">Default</span>
                    {currentColorTheme === null && (
                      <CheckIcon className="h-4 w-4" />
                    )}
                  </button>
                  {/* Color theme options */}
                  {colorThemes.map((colorTheme) => (
                    <button
                      key={colorTheme}
                      onClick={() => {
                        handleColorThemeChange(colorTheme)
                        setOpen(false)
                      }}
                      className={cn(
                        "flex items-center justify-center gap-2 rounded-lg border-2 p-3 transition-all hover:bg-accent",
                        currentColorTheme === colorTheme
                          ? "border-primary bg-accent"
                          : "border-border"
                      )}
                    >
                      <ThemeCircle color={themeColors[colorTheme]} />
                      <span className="text-sm font-medium capitalize">
                        {colorTheme}
                      </span>
                      {currentColorTheme === colorTheme && (
                        <CheckIcon className="h-4 w-4" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </PopoverContent>
    </Popover>
  )
}
