# Theme Setup Guide

This project uses **next-themes** with **shadcn/ui** for theme management. The setup supports multiple custom themes including light, dark, and custom color schemes (blue, green, purple).

## Overview

The theme system is configured to:

- Support system preference detection
- Provide light and dark themes
- Support custom color themes (blue, green, purple)
- Persist theme selection in localStorage
- Avoid hydration mismatches

## File Structure

```
src/
├── components/
│   ├── theme-provider.tsx      # ThemeProvider wrapper component
│   └── theme-switcher.tsx      # Theme switcher dropdown component
├── app/
│   ├── layout.tsx              # Root layout with ThemeProvider
│   └── globals.css             # Theme CSS variables
```

## Current Themes

The following themes are available:

1. **light** - Light mode with default colors
2. **dark** - Dark mode with default colors
3. **system** - Respects user's system preference (switches between light/dark)
4. **azure** - Azure blue color scheme (fixed theme, doesn't adapt to system preference)
5. **emerald** - Emerald green color scheme (fixed theme, doesn't adapt to system preference)
6. **violet** - Violet purple color scheme (fixed theme, doesn't adapt to system preference)

**Note:** Custom themes (azure, emerald, violet) are fixed themes that don't automatically switch based on system preference. They have both light and dark CSS variants defined (`.azure` and `.azure.dark`), but next-themes will only apply the base theme class. If you want custom themes to respect system dark mode, you'll need to use separate theme names (see "Creating Separate Light/Dark Variants" below).

## How It Works

### ThemeProvider Setup

The `ThemeProvider` is configured in `src/app/layout.tsx`:

```tsx
<ThemeProvider
  attribute="class"
  defaultTheme="system"
  enableSystem
  disableTransitionOnChange
  themes={["light", "dark", "system", "azure", "emerald", "violet"]}
>
  {/* Your app content */}
</ThemeProvider>
```

**Props Explained:**

- `attribute="class"` - Applies theme as a class on the `<html>` element
- `defaultTheme="system"` - Defaults to system preference
- `enableSystem` - Enables system preference detection
- `disableTransitionOnChange` - Prevents flash during theme changes
- `themes` - List of available theme names

### CSS Variables

Themes are defined using CSS custom properties in `src/app/globals.css`. Each theme defines:

- Background and foreground colors
- Primary, secondary, and accent colors
- Muted colors
- Border and input colors
- Chart colors
- Sidebar colors

**Example - Azure Theme:**

```css
.azure {
  --background: oklch(0.98 0.01 240);
  --foreground: oklch(0.15 0.02 240);
  --primary: oklch(0.55 0.22 240);
  /* ... more variables */
}

.azure.dark {
  /* Dark variant of azure theme */
  --background: oklch(0.2 0.02 240);
  /* ... more variables */
}
```

## Using the Theme Switcher

The `ThemeSwitcher` component provides a dropdown menu to switch between themes:

```tsx
import { ThemeSwitcher } from "@/components/theme-switcher";

export function MyComponent() {
  return (
    <div>
      <ThemeSwitcher />
    </div>
  );
}
```

## Programmatic Theme Control

You can also control themes programmatically using the `useTheme` hook:

```tsx
"use client";

import { useTheme } from "next-themes";

export function MyComponent() {
  const { theme, setTheme, themes, resolvedTheme } = useTheme();

  return (
    <div>
      <p>Current theme: {theme}</p>
      <p>Resolved theme: {resolvedTheme}</p>
      <button onClick={() => setTheme("dark")}>Dark</button>
      <button onClick={() => setTheme("light")}>Light</button>
      <button onClick={() => setTheme("azure")}>Azure</button>
    </div>
  );
}
```

**Hook Properties:**

- `theme` - Current theme name (can be "system")
- `setTheme(themeName)` - Function to change theme
- `themes` - Array of available themes
- `resolvedTheme` - Actual theme being used (when theme is "system", this shows "light" or "dark")

## Adding New Custom Themes

To add a new custom theme (e.g., "amber" or "rose"), follow these steps:

### Step 1: Add Theme to ThemeProvider

Update `src/app/layout.tsx`:

```tsx
<ThemeProvider
  // ... other props
  themes={["light", "dark", "system", "azure", "emerald", "violet", "amber"]}
>
```

### Step 2: Add CSS Variables

Add the theme CSS in `src/app/globals.css` after the existing themes:

```css
/* Amber Theme */
.amber {
  --background: oklch(0.98 0.01 60);
  --foreground: oklch(0.15 0.02 60);
  --card: oklch(0.99 0.01 60);
  --card-foreground: oklch(0.15 0.02 60);
  --popover: oklch(0.99 0.01 60);
  --popover-foreground: oklch(0.15 0.02 60);
  --primary: oklch(0.55 0.22 60);
  --primary-foreground: oklch(1 0 0);
  --secondary: oklch(0.95 0.01 60);
  --secondary-foreground: oklch(0.25 0.02 60);
  --muted: oklch(0.96 0.01 60);
  --muted-foreground: oklch(0.45 0.01 60);
  --accent: oklch(0.93 0.02 60);
  --accent-foreground: oklch(0.55 0.18 60);
  --destructive: oklch(0.63 0.19 23);
  --destructive-foreground: oklch(1 0 0);
  --border: oklch(0.92 0.01 60);
  --input: oklch(0.94 0.01 60);
  --ring: oklch(0.55 0.22 60);
  --chart-1: oklch(0.75 0.15 156);
  --chart-2: oklch(0.55 0.22 60);
  --chart-3: oklch(0.73 0.18 50);
  --chart-4: oklch(0.58 0.18 260);
  --chart-5: oklch(0.56 0.01 60);
  --sidebar: oklch(0.97 0.01 248);
  --sidebar-foreground: oklch(0.15 0.02 60);
  --sidebar-primary: oklch(0.55 0.22 60);
  --sidebar-primary-foreground: oklch(1 0 0);
  --sidebar-accent: oklch(0.94 0.01 60);
  --sidebar-accent-foreground: oklch(0.55 0.22 60);
  --sidebar-border: oklch(0.92 0.01 60);
  --sidebar-ring: oklch(0.55 0.22 60);
}

.amber.dark {
  --background: oklch(0.2 0.02 60);
  --foreground: oklch(0.96 0.01 60);
  --card: oklch(0.24 0.02 60);
  --card-foreground: oklch(0.96 0.01 60);
  --popover: oklch(0.24 0.02 60);
  --popover-foreground: oklch(0.96 0.01 60);
  --primary: oklch(0.62 0.23 60);
  --primary-foreground: oklch(1 0 0);
  --secondary: oklch(0.28 0.02 60);
  --secondary-foreground: oklch(0.96 0.01 60);
  --muted: oklch(0.28 0.02 60);
  --muted-foreground: oklch(0.71 0.01 60);
  --accent: oklch(0.27 0.04 60);
  --accent-foreground: oklch(0.79 0.12 60);
  --destructive: oklch(0.71 0.17 22);
  --destructive-foreground: oklch(1 0 0);
  --border: oklch(0.32 0.02 60);
  --input: oklch(0.32 0.02 60);
  --ring: oklch(0.62 0.23 60);
  --chart-1: oklch(0.8 0.18 156);
  --chart-2: oklch(0.62 0.23 60);
  --chart-3: oklch(0.81 0.1 50);
  --chart-4: oklch(0.67 0.16 260);
  --chart-5: oklch(0.71 0.01 60);
  --sidebar: oklch(0.18 0.01 60);
  --sidebar-foreground: oklch(0.96 0.01 60);
  --sidebar-primary: oklch(0.62 0.23 60);
  --sidebar-primary-foreground: oklch(1 0 0);
  --sidebar-accent: oklch(0.28 0.02 60);
  --sidebar-accent-foreground: oklch(0.62 0.23 60);
  --sidebar-border: oklch(0.32 0.02 60);
  --sidebar-ring: oklch(0.62 0.23 60);
}
```

**Notes:**

- The hue value (last number in oklch) determines the color:
  - 0-60: Red to Yellow
  - 60-120: Yellow to Green
  - 120-180: Green to Cyan
  - 180-240: Cyan to Blue
  - 240-300: Blue to Magenta
  - 300-360: Magenta to Red
- Light themes use higher lightness values (0.95-0.99)
- Dark themes use lower lightness values (0.18-0.24)
- The middle value (chroma) controls saturation (0.01-0.23)

**Important:** The `.azure.dark`, `.emerald.dark`, and `.violet.dark` CSS selectors are defined but won't automatically apply with next-themes. They're included for potential future use or if you want to create a custom solution that combines theme classes with dark mode. For now, `.azure`, `.emerald`, and `.violet` work as standalone fixed themes.

### Step 3: Update Theme Switcher

Update `src/components/theme-switcher.tsx` to include the new theme:

```tsx
const themes = [
  // ... existing themes
  { value: "amber", label: "Amber", icon: Palette },
] as const;
```

### Step 4: Add Icon (Optional)

If you want a custom icon instead of the generic `Palette` icon, import it from `lucide-react`:

```tsx
import { Sun, Moon, Monitor, Palette, Sparkles } from "lucide-react";

const themes = [
  // ...
  { value: "amber", label: "Amber", icon: Sparkles },
] as const;
```

## Custom Theme with Separate Light/Dark Variants

If you want a custom theme to have explicit light and dark variants that users can select separately (e.g., "amber-light" and "amber-dark"), you can:

### Step 1: Add Both Variants to ThemeProvider

Update `src/app/layout.tsx`:

```tsx
<ThemeProvider
  // ... other props
  themes={["light", "dark", "system", "amber-light", "amber-dark"]}
>
```

### Step 2: Define CSS for Both Variants

Add the theme CSS in `src/app/globals.css`:

```css
/* Amber Light Theme */
.amber-light {
  --background: oklch(0.98 0.01 60);
  --foreground: oklch(0.15 0.02 60);
  --primary: oklch(0.55 0.22 60);
  /* ... rest of light theme variables */
}

/* Amber Dark Theme */
.amber-dark {
  --background: oklch(0.2 0.02 60);
  --foreground: oklch(0.96 0.01 60);
  --primary: oklch(0.62 0.23 60);
  /* ... rest of dark theme variables */
}
```

### Step 3: Update Theme Switcher

Update `src/components/theme-switcher.tsx`:

```tsx
const themes = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
  { value: "amber-light", label: "Amber (Light)", icon: Palette },
  { value: "amber-dark", label: "Amber (Dark)", icon: Palette },
] as const;
```

**Alternative Approach:** You can also group them in the dropdown using a separator or submenu for better organization.

## Scrollbar Layout Shift Fix

To prevent layout shift when dropdowns open (which can hide the scrollbar), the following fixes are implemented:

1. **CSS Scrollbar Gutter**: Added `scrollbar-gutter: stable` to the `html` element in `globals.css` to reserve space for the scrollbar.

2. **Non-modal Dropdown**: The `ThemeSwitcher` uses `modal={false}` on the `DropdownMenu` to prevent body scroll lock that causes layout shift.

3. **Auto-focus Prevention**: Added `onCloseAutoFocus` handler to prevent focus issues.

These changes ensure the layout remains stable when opening the theme switcher dropdown.

## Troubleshooting

### Theme Not Applying

- Ensure `suppressHydrationWarning` is on the `<html>` tag in `layout.tsx`
- Check that the theme class is being applied to the `<html>` element
- Verify CSS variables are defined correctly in `globals.css`

### Flash of Wrong Theme

- This is normal on initial load. The `disableTransitionOnChange` prop helps minimize it.
- Consider using a loading state or skeleton screen during hydration.

### Custom Theme Not Working

- Verify the theme name matches between:
  - `themes` prop in ThemeProvider
  - CSS class name (e.g., `.blue`)
  - Theme switcher configuration
- Check browser DevTools to see if the class is being applied to `<html>`

### System Theme Not Respecting Preference

- Ensure `enableSystem` prop is set to `true`
- Check that `defaultTheme="system"` or allow users to select "system"
- Verify browser/system dark mode settings

## Best Practices

1. **Always provide both light and dark variants** for custom themes
2. **Use consistent naming** - lowercase, kebab-case for theme names
3. **Test themes** in both light and dark system preferences
4. **Use OKLCH color space** for better color consistency and accessibility
5. **Maintain contrast ratios** - ensure foreground/background contrast meets WCAG AA standards

## Resources

- [next-themes Documentation](https://github.com/pacocoursey/next-themes)
- [shadcn/ui Theme Documentation](https://ui.shadcn.com/docs/theming)
- [OKLCH Color Space](https://oklch.com/)
- [WCAG Contrast Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
