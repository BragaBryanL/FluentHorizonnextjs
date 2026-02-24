"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type PaletteType = "default" | "ocean" | "sunset" | "forest" | "custom";

interface ThemeContextType {
  palette: PaletteType;
  setPalette: (palette: PaletteType) => void;
  customColors: { background: string; heading: string; description: string };
  setCustomColors: (colors: { background: string; heading: string; description: string }) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [palette, setPalette] = useState<PaletteType>("default");
  const [customColors, setCustomColors] = useState({
    background: "#f8fafc",
    heading: "#0f172a",
    description: "#475569",
  });

  useEffect(() => {
    // Check for stored theme preference
    const storedTheme = localStorage.getItem("fluent_theme");
    if (storedTheme) {
      setPalette(storedTheme as PaletteType);
    }
  }, []);

  const handleSetPalette = (newPalette: PaletteType) => {
    setPalette(newPalette);
    localStorage.setItem("fluent_theme", newPalette);
  };

  return (
    <ThemeContext.Provider
      value={{
        palette,
        setPalette: handleSetPalette,
        customColors,
        setCustomColors,
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
