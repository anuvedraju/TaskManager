import React from "react";
import { TouchableOpacity, StyleSheet, ViewStyle } from "react-native";
import Typography from "./typography";
import { colors } from "../utils/theme";

type C2ButtonProps = {
  onPress: () => void;
  title: string;
  backgroundColor?: string;
  textColor?: string;
  padding?: number;
  paddingHorizontal?: number;
  borderRadius?: number;
  style?: ViewStyle;
  disabled?: boolean;
};

const C2Button: React.FC<C2ButtonProps> = ({
  onPress,
  title,
  backgroundColor = colors.secondary,
  textColor = "white",
  padding = 2,
  paddingHorizontal = 5,
  borderRadius = 5,
  style,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      onPress={disabled ? undefined : onPress}
      style={[
        styles.button,
        {
          backgroundColor: disabled ? `${backgroundColor}80` : backgroundColor, // Reduced opacity
          padding,
          paddingHorizontal,
          borderRadius,
        },
        style,
      ]}
      disabled={disabled}
    >
      <Typography color={textColor} weight="BLD">{title}</Typography>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default C2Button;