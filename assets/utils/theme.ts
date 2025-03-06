// src/theme.ts
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
export type ThemeColors = {
  primary: string;
  secondary: string;
  greenOne: string;
  accent: string;
  background: string;
  textPrimary: string;
  textSecondary: string;
  black: string;
  white: string;
  error: string;
  success: string;
  grey: string;
  grey2: string;
  greylight: string;
  chat: string;
  mychat: string;
  otherchat: string;
  slate: string;
  bluetext: string;
  dark?: boolean;
  green: string;
  read: string;
  blue: string;
  orange: string;
  torqoise: string;
};
export type DimensionHelper = {
  width: number;
  height: number;
  wp: (percentage: number) => number;
  hp: (percentage: number) => number;
};
export type Fonts = {
  LIT: "Roboto-Light";
  MED: "Roboto-Medium";
  BLD: "Roboto-Bold";
  XBLD: "Roboto-Black";
  SG: "SourGummy-ExtraBold";
  LT: "lato-bold";
  LX: "lato-black";
};

export const colors: ThemeColors = {
  primary: "#3498db", // Blue
  secondary: "#2ecc71", // Green
  greenOne: "#99ff66", // Green
  accent: "#f39c12", // Yellow
  background: "#f4f4f4", // Light Gray
  textPrimary: "#333333", // Dark Text
  textSecondary: "#7f8c8d", // Light Text
  error: "#e74c3c", // Red
  success: "#2ecc71", // Green
  black: "#000000",
  white: "#FFFF",
  grey: "#dedede",
  grey2: "#8888",
  greylight: "#c5c8c8",
  chat: "green",
  mychat: "#58d1deff",
  otherchat: "#81d665",
  // Green
  slate: "#f8f8f8",
  bluetext: "#a4d8ed",
  green: "#1ede14",
  blue: "#0da8e5",
  read: "#000000",
  orange: "#ec7b0a",

  torqoise: "#0be8e1",
};

// theme.js
export const LightTheme = {
  dark: false,
  colors: {
    primary: "#3498db", // Blue
    secondary: "#2ecc71", // Green
    greenOne: "#99ff66", // Green
    accent: "#f39c12", // Yellow
    background: "#f4f4f4", // Light Gray
    textPrimary: "#333333", // Dark Text
    textSecondary: "#7f8c8d", // Light Text
    error: "#e74c3c", // Red
    success: "#2ecc71", // Green
    black: "#000000",
    white: "#FFFF",
    grey: "#dedede",
    grey2: "#8888",
    greylight: "#bdc5c572",
    chat: "#2db300", // Green
    slate: "#f8f8f8",
    bluetext: "#a4d8ed",
  },
};

export const DarkTheme = {
  dark: true,
  colors: {
    primary: "#29a6b9", // Darker Blue
    secondary: "#27ae60", // Darker Green
    greenOne: "#99ff66", // Green
    accent: "#e67e22", // Darker Yellow
    background: "#000000", // Dark Gray
    textPrimary: "#ecf0f1", // Light Text
    textSecondary: "#95a5a6", // Lighter Text
    error: "#c0392b", // Dark Red
    success: "#27ae60", // Green
    black: "#FFFFFF",
    white: "#1c1b1b",
    grey: "#34495e", // Darker Gray
    grey2: "#95a5a6", // Light Gray
    greylight: "#bdc5c572",
    chat: "#1f7a1f", // Dark Green
    slate: "#34495e",
    bluetext: "#3498db", // Blue Text
  },
};

export const fonts: Fonts = {
  LIT: "Roboto-Light",
  MED: "Roboto-Medium",
  BLD: "Roboto-Bold",
  XBLD: "Roboto-Black",
  SG: "SourGummy-ExtraBold",
  LT: "lato-bold",
};

export const DIMENSIONS: DimensionHelper = {
  width,
  height,
  wp: (percentage: number) => (percentage * width) / 100,
  hp: (percentage: number) => (percentage * height) / 100,
};
