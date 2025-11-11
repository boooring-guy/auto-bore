# Settings.ts Usage Guide

This guide explains how to use the `settings.ts` file in your editor application.

## Overview

The `settings.ts` file provides:

- **Settings Schema**: Zod schema for type-safe settings validation
- **Settings Type**: TypeScript type inferred from the schema
- **Default Settings**: Default values for all settings
- **Jotai Atoms**: State management with localStorage persistence

## Available Exports

```typescript
import {
  SettingsSchema, // Zod schema for validation
  Settings, // TypeScript type
  DEFAULT_SETTINGS, // Default settings object
  settingsAtom, // Read-only atom (useAtomValue)
  persistentSettingsAtom, // Writable atom (useAtom)
} from "@/config/settings"
```

## Usage Examples

### 1. Reading Settings (Read-Only)

Use `useAtomValue` to read settings without modifying them:

```typescript
import { useAtomValue } from "jotai"
import { settingsAtom } from "@/config/settings"

function MyComponent() {
  const settings = useAtomValue(settingsAtom)

  return (
    <div>
      <p>Auto-save: {settings.autoSave ? "Enabled" : "Disabled"}</p>
      <p>Auto-save interval: {settings.autoSaveInterval}ms</p>
    </div>
  )
}
```

### 2. Updating Settings

Use `useAtom` with `persistentSettingsAtom` to read and update settings:

```typescript
import { useAtom } from "jotai"
import { persistentSettingsAtom } from "@/config/settings"

function SettingsToggle() {
  const [settings, setSettings] = useAtom(persistentSettingsAtom)

  const toggleAutoSave = () => {
    setSettings({ autoSave: !settings.autoSave })
  }

  return (
    <button onClick={toggleAutoSave}>
      Auto-save: {settings.autoSave ? "ON" : "OFF"}
    </button>
  )
}
```

### 3. Implementing Auto-Save in Editor

**File: `src/hooks/useAutoSave.ts`**

This hook automatically saves the workflow based on the settings:

```typescript
import { useAutoSave } from "@/hooks/useAutoSave"

function Editor({ workflowId }: EditorProps) {
  // Enable auto-save based on settings
  useAutoSave(workflowId)

  // ... rest of component
}
```

The hook:
- Checks if auto-save is enabled in settings
- Uses the configured auto-save interval
- Only saves when workflow has actually changed
- Prevents duplicate saves

### 4. Creating a Settings UI Component

**File: `src/modules/editor/components/EditorSettings.tsx`**

A complete settings panel component that allows users to:
- Toggle auto-save on/off
- Adjust auto-save interval
- Configure notifications
- Select notification sound

**Usage in Editor Header:**

```typescript
import { EditorSettings } from "./EditorSettings"

function EditorHeaderSaveButton({ workflowId }: Props) {
  const settings = useAtomValue(settingsAtom)

  return (
    <div className="ml-auto flex items-center gap-2">
      {settings.autoSave && (
        <span className="text-xs text-muted-foreground">Auto-saving...</span>
      )}
      <Button onClick={handleSave}>Save</Button>
      <EditorSettings workflowId={workflowId} />
    </div>
  )
}
```

## Integration Points

### Editor Component

- Use settings to control auto-save behavior
- Respect `autoSave` and `autoSaveInterval` settings

### Editor Header

- Show auto-save status indicator
- Allow manual save (always available)
- Show settings button/icon

### Settings Panel

- Toggle auto-save on/off
- Adjust auto-save interval
- Configure notifications
- Select notification sound

## Settings Structure

```typescript
{
  version: number // Schema version (increment on changes)
  notifications: {
    enabled: boolean // Enable/disable notifications
    sound: string | null // Notification sound name
  }
  autoSave: boolean // Enable/disable auto-save
  autoSaveInterval: number // Auto-save interval in milliseconds
}
```

## Best Practices

1. **Always use `persistentSettingsAtom` for updates** - This ensures localStorage sync
2. **Use `useAtomValue` for read-only access** - More efficient than `useAtom`
3. **Validate settings on load** - The schema handles this automatically
4. **Increment version when changing schema** - Helps with migrations
5. **Merge with defaults** - Already handled in `loadSettings()`

## Current Integration

The settings are already integrated into:

1. **`src/modules/editor/components/Editor.tsx`**
   - Uses `useAutoSave(workflowId)` hook to enable auto-save

2. **`src/modules/editor/components/EdtiorHeader.tsx`**
   - Shows auto-save status indicator
   - Includes settings button via `<EditorSettings />`

3. **`src/hooks/useAutoSave.ts`**
   - Implements auto-save logic based on settings

4. **`src/modules/editor/components/EditorSettings.tsx`**
   - Provides UI for managing all settings

## Storage

Settings are automatically persisted to `localStorage` under the key `"editor_settings"`.
Changes are saved immediately when using `persistentSettingsAtom`.

## Quick Start

1. **To use settings in a component:**
   ```typescript
   import { useAtomValue } from "jotai"
   import { settingsAtom } from "@/config/settings"

   const settings = useAtomValue(settingsAtom)
   ```

2. **To update settings:**
   ```typescript
   import { useAtom } from "jotai"
   import { persistentSettingsAtom } from "@/config/settings"

   const [settings, setSettings] = useAtom(persistentSettingsAtom)
   setSettings({ autoSave: true })
   ```

3. **To add auto-save to a component:**
   ```typescript
   import { useAutoSave } from "@/hooks/useAutoSave"

   useAutoSave(workflowId)
   ```
