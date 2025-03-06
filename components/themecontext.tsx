import React, { createContext, useState, useEffect, useContext, useMemo } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appearance, Platform } from "react-native";
import { LightTheme, DarkTheme } from "../utils/theme";
import * as NavigationBar from "expo-navigation-bar";

// Define the context type
interface ThemeContextType {
  theme: typeof LightTheme;
  toggleTheme: () => void;
}

// Create ThemeContext
const ThemeContext = createContext<ThemeContextType>({
  theme: LightTheme,
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState(LightTheme);

  // Load the saved theme or system theme
  useEffect(() => {
    AsyncStorage.getItem("appTheme").then((savedTheme) => {
      if (savedTheme) {
        setTheme(savedTheme === "dark" ? DarkTheme : LightTheme);
      } else {
        const systemTheme = Appearance.getColorScheme();
        setTheme(systemTheme === "dark" ? DarkTheme : LightTheme);
      }
    });

    // Listen for system theme changes
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme === "dark" ? DarkTheme : LightTheme);
    });

    return () => subscription.remove();
  }, []);

  // Update Navigation Bar for Android when theme changes
  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setBackgroundColorAsync(theme.colors.background);
    }
  }, [theme]);

  // Function to toggle the theme
  const toggleTheme = async () => {
    const newTheme = theme.dark ? LightTheme : DarkTheme;
    setTheme(newTheme);
    await AsyncStorage.setItem("appTheme", newTheme.dark ? "dark" : "light");
  };

  // Memoized value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};

// Custom hook to use ThemeContext
export const useTheme = () => useContext(ThemeContext);