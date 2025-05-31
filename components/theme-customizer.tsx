"use client"

import { useState } from "react"
import { Paintbrush, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useTheme } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const colorOptions = [
  { name: "Blue", value: "#0088CC" },
  { name: "Purple", value: "#8A2BE2" },
  { name: "Pink", value: "#FF1493" },
  { name: "Red", value: "#FF4500" },
  { name: "Orange", value: "#FF8C00" },
  { name: "Green", value: "#2E8B57" },
  { name: "Teal", value: "#20B2AA" },
]

export function ThemeCustomizer() {
  const { primaryColor, setPrimaryColor, theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="bg-card border-border hover:bg-muted">
          <Paintbrush className="h-4 w-4" />
          <span className="sr-only">Customize theme</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 bg-card border-border">
        <div className="space-y-4">
          <h4 className="font-medium text-sm">Appearance</h4>
          <Tabs defaultValue={theme} onValueChange={(value) => setTheme(value as "light" | "dark")}>
            <TabsList className="w-full">
              <TabsTrigger value="light" className="flex-1">
                <Sun className="h-4 w-4 mr-2" />
                Light
              </TabsTrigger>
              <TabsTrigger value="dark" className="flex-1">
                <Moon className="h-4 w-4 mr-2" />
                Dark
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <h4 className="font-medium text-sm">Color Theme</h4>
          <div className="grid grid-cols-4 gap-2">
            {colorOptions.map((color) => (
              <button
                key={color.value}
                className={cn(
                  "theme-color-option",
                  primaryColor === color.value && "ring-2 ring-foreground ring-offset-2 ring-offset-background",
                )}
                style={{ backgroundColor: color.value }}
                onClick={() => setPrimaryColor(color.value)}
                title={color.name}
              />
            ))}
          </div>
          <div className="pt-2">
            <p className="text-xs text-muted-foreground">Choose your preferred accent color for the interface.</p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
