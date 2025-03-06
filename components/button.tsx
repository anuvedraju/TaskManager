import React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from "react-native";
import Typography from "./typography";
import { colors, ThemeColors } from "../utils/theme";

type CustomButtonProps = {
  label: string;
  onPress: () => void;
  buttonColor?: string | keyof ThemeColors;
  borderRadius?: number;
  width?: string | number;
  height?: number;
  labelColor?: string;
  style?: ViewStyle;
  disabled: boolean;
};

const CButton: React.FC<CustomButtonProps> = ({
  label,
  onPress,
  buttonColor = "primary",
  borderRadius = 5,
  width = "100%",
  height = 50,
  labelColor = "black",
  style,
  disabled,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        style,
        {
          backgroundColor: colors[buttonColor],
          borderRadius,
          width,
          height,
          opacity: disabled ? 0.4 : 1,
        },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Typography color={labelColor} style={styles.label}>
        {label}
      </Typography>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  label: {
    fontSize: 16,
  },
});

export default CButton;
