import React from "react";
import { Text, StyleSheet, TextStyle, View } from "react-native";
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  Text as SvgText,
} from "react-native-svg";
import { useTheme } from "./themecontext";
import { Fonts, ThemeColors } from "@/utils/theme";

type TypographyProps = {
  children: React.ReactNode;
  size?: number;
  color?: keyof ThemeColors | string | string[]; // Allow gradient colors
  fontFamily?: string;
  weight?: keyof Fonts;
  style?: TextStyle;
  numberOfLines?: number;
  ellipsizeMode?: any;
};

const Typography: React.FC<TypographyProps> = ({
  children,
  size = 14,
  color = "textPrimary",
  weight = "LIT",
  fontFamily,
  style,
  numberOfLines,
  ellipsizeMode,
}) => {
  const fontWeightMap: { [key: string]: any } = {
    LIT: "normal",
    MED: 400,
    BLD: "bold",
    XBLD: 900,
    SG: "SourGummy-ExtraBold",
    LT: "lato-bold",
    LX: "lato-black",
  };

  const fontFamilyMap: { [key: string]: any } = {
    LIT: "Roboto-Light",
    MED: "Roboto-Medium",
    BLD: "Roboto-Bold",
    XBLD: "Roboto-Black",
    SG: "SourGummy-ExtraBold",
    LT: "lato-bold",
    LX: "lato-black",
  };

  const { theme } = useTheme();

  const dynamicStyles = StyleSheet.create({
    text: {
      fontSize: size,
      color: Array.isArray(color) ? undefined : theme.colors[color],
      fontFamily: fontFamily || fontFamilyMap[weight] || "Roboto-Medium", // Use custom fontFamily if provided
      fontWeight: fontWeightMap[weight] || "normal",
    },
  });

  const combinedStyles = [dynamicStyles.text, style];

  if (Array.isArray(color)) {
    // Render gradient text if `color` is an array of gradient colors
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Svg
          height={size * 1.5}
          width="100%"
          viewBox={`0 0 ${children.toString().length * size} ${size * 1.5}`}
        >
          <Defs>
            <LinearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
              {color.map((gradientColor, index) => (
                <Stop
                  key={index}
                  offset={`${index / (color.length - 1)}`}
                  stopColor={gradientColor}
                  stopOpacity="1"
                />
              ))}
            </LinearGradient>
          </Defs>
          <SvgText
            fill="url(#gradient)"
            fontSize={size}
            fontWeight={fontWeightMap[weight]}
            fontFamily={fontFamily || fontFamilyMap[weight]}
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
          >
            {children}
          </SvgText>
        </Svg>
      </View>
    );
  }

  return (
    <Text
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      style={combinedStyles}
    >
      {children}
    </Text>
  );
};

export default Typography;
