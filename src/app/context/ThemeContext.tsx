"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type PaletteType = "default" | "ocean" | "sunset" | "forest" | "lavender" | "midnight" | "rose" | "custom";

interface ThemeContextType {
  palette: PaletteType;
  setPalette: (palette: PaletteType) => void;
  customColors: { background: string; heading: string; description: string; accent: string };
  setCustomColors: (colors: { background: string; heading: string; description: string; accent: string }) => void;
  paletteInfo: {
    id: PaletteType;
    name: string;
    gradient: string;
    textPrimary: string;
    textSecondary: string;
    textAccent: string;
  }[];
}

const themePalettes = {
  default: {
    id: "default" as const,
    name: "Daylight",
    gradient: "from-slate-50 via-blue-50 to-indigo-50",
    textPrimary: "text-slate-900",
    textSecondary: "text-slate-600",
    textAccent: "text-blue-600",
  },
  ocean: {
    id: "ocean" as const,
    name: "Ocean Night",
    gradient: "from-slate-900 via-blue-900 to-slate-900",
    textPrimary: "text-white",
    textSecondary: "text-blue-200",
    textAccent: "text-cyan-300",
  },
  sunset: {
    id: "sunset" as const,
    name: "Sunset",
    gradient: "from-orange-500 via-rose-500 to-pink-600",
    textPrimary: "text-white",
    textSecondary: "text-orange-100",
    textAccent: "text-yellow-300",
  },
  forest: {
    id: "forest" as const,
    name: "Forest",
    gradient: "from-green-800 via-emerald-700 to-teal-800",
    textPrimary: "text-white",
    textSecondary: "text-green-100",
    textAccent: "text-emerald-300",
  },
  lavender: {
    id: "lavender" as const,
    name: "Lavender Dream",
    gradient: "from-purple-900 via-violet-800 to-indigo-900",
    textPrimary: "text-white",
    textSecondary: "text-purple-200",
    textAccent: "text-pink-300",
  },
  midnight: {
    id: "midnight" as const,
    name: "Midnight",
    gradient: "from-gray-900 via-slate-900 to-black",
    textPrimary: "text-white",
    textSecondary: "text-gray-300",
    textAccent: "text-cyan-400",
  },
  rose: {
    id: "rose" as const,
    name: "Rose Gold",
    gradient: "from-rose-400 via-pink-500 to-red-500",
    textPrimary: "text-white",
    textSecondary: "text-rose-100",
    textAccent: "text-yellow-200",
  },
  custom: {
    id: "custom" as const,
    name: "Custom",
    gradient: "from-slate-50 via-white to-blue-50",
    textPrimary: "text-slate-900",
    textSecondary: "text-slate-600",
    textAccent: "text-blue-600",
  },
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [palette, setPalette] = useState<PaletteType>("default");
  const [customColors, setCustomColors] = useState({
    background: "linear-gradient(to bottom right, #f8fafc, #ffffff, #eff6ff)",
    heading: "#0f172a",
    description: "#475569",
    accent: "#3b82f6",
  });

  useEffect(() => {
    // Check for stored theme preference
    const storedTheme = localStorage.getItem("fluent_theme");
    if (storedTheme) {
      setPalette(storedTheme as PaletteType);
    }
    
    // Check for custom colors
    const storedCustomColors = localStorage.getItem("fluent_custom_colors");
    if (storedCustomColors) {
      setCustomColors(JSON.parse(storedCustomColors));
    }
  }, []);

  const handleSetPalette = (newPalette: PaletteType) => {
    setPalette(newPalette);
    localStorage.setItem("fluent_theme", newPalette);
  };

  const handleSetCustomColors = (colors: { background: string; heading: string; description: string; accent: string }) => {
    setCustomColors(colors);
    localStorage.setItem("fluent_custom_colors", JSON.stringify(colors));
  };

  const paletteInfo = Object.values(themePalettes);

  return (
    <ThemeContext.Provider
      value={{
        palette,
        setPalette: handleSetPalette,
        customColors,
        setCustomColors: handleSetCustomColors,
        paletteInfo,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
