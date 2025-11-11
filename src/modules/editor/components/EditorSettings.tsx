"use client"

import { useAtom } from "jotai"
import { persistentSettingsAtom, type Settings } from "@/config/settings"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { SettingsIcon } from "lucide-react"
import { useState } from "react"

type Props = {
  workflowId?: string
}

export function EditorSettings({ workflowId }: Props) {
  const [settings, setSettings] = useAtom(persistentSettingsAtom)
  const [open, setOpen] = useState(false)

  const updateSettings = (updates: Partial<Settings>) => {
    setSettings(updates)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <SettingsIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Editor Settings</DialogTitle>
          <DialogDescription>
            Configure editor behavior and preferences
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          {/* Auto-Save Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-save">Auto-Save</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically save your workflow changes
                </p>
              </div>
              <Switch
                id="auto-save"
                checked={settings.autoSave}
                onCheckedChange={(checked) =>
                  updateSettings({ autoSave: checked })
                }
                className="py-2"
              />
            </div>

            {settings.autoSave && (
              <div className="space-y-2 pl-4">
                <Label htmlFor="auto-save-interval">Auto-Save Interval</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="auto-save-interval"
                    type="number"
                    min="1000"
                    step="1000"
                    value={settings.autoSaveInterval}
                    onChange={(e) =>
                      updateSettings({
                        autoSaveInterval: Math.max(
                          1000,
                          parseInt(e.target.value, 10) || 10000
                        ),
                      })
                    }
                    className="w-32"
                  />
                  <span className="text-sm text-muted-foreground">
                    milliseconds
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Current: {settings.autoSaveInterval / 1000}s
                </p>
              </div>
            )}
          </div>

          {/* Notifications Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notifications">Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Enable notification alerts
                </p>
              </div>
              <Switch
                id="notifications"
                checked={settings.notifications.enabled}
                onCheckedChange={(checked) =>
                  updateSettings({
                    notifications: {
                      ...settings.notifications,
                      enabled: checked,
                    },
                  })
                }
              />
            </div>

            {settings.notifications.enabled && (
              <div className="space-y-2 pl-4">
                <Label htmlFor="notification-sound">Notification Sound</Label>
                <Input
                  id="notification-sound"
                  type="text"
                  value={settings.notifications.sound || ""}
                  onChange={(e) =>
                    updateSettings({
                      notifications: {
                        ...settings.notifications,
                        sound: e.target.value || null,
                      },
                    })
                  }
                  placeholder="ding"
                  className="w-full"
                />
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
