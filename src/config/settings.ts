// this file contains the settings for the editor
// settings.ts
import { z } from "zod"

// 1) schema
export const SettingsSchema = z.object({
  version: z.number(), // increment when you change schema
  notifications: z.object({
    enabled: z.boolean(),
    sound: z.string().nullable(),
  }),
  autoSave: z.boolean(),
  autoSaveInterval: z.number(),
})

// 2) inferred type
export type Settings = z.infer<typeof SettingsSchema>

// 3) defaults
import { atom } from "jotai"

export const DEFAULT_SETTINGS: Settings = {
  version: 0.1,
  notifications: { enabled: true, sound: "ding" },
  autoSave: true,
  autoSaveInterval: 10000, // 10 seconds
}

// Atom for settings state, interlinked with localStorage
function loadSettings(): Settings {
  try {
    const stored = localStorage.getItem("editor_settings")
    if (stored) {
      const parsed = JSON.parse(stored)
      return { ...DEFAULT_SETTINGS, ...parsed } // merge the default settings with the stored settings
    }
  } catch (e) {}
  return DEFAULT_SETTINGS
}

// Atom for settings state, interlinked with localStorage
export const settingsAtom = atom<Settings>(
  typeof window !== "undefined" ? loadSettings() : DEFAULT_SETTINGS
)

// Store back to localStorage whenever changed
export const persistentSettingsAtom = atom(
  (get) => get(settingsAtom),
  (get, set, update: Partial<Settings>) => {
    const merged = { ...get(settingsAtom), ...update }
    set(settingsAtom, merged)
    if (typeof window !== "undefined") {
      localStorage.setItem("editor_settings", JSON.stringify(merged))
    }
  }
)
