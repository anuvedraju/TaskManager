import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "./icon";
import Typography from "./typography";
import { colors, ThemeColors } from "../utils/theme";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "./themecontext";

interface HeaderButton {
  label?: string;

  icon?: string;
  onPress: () => void;
}

interface HeaderProps {
  title: string;
  labelColor?: keyof ThemeColors;
  backgroundcolorx?: keyof ThemeColors;
  buttons?: HeaderButton[]; // Array of button configurations (up to 4)
  backbutton?: boolean;
  backaction?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  labelColor = "primary",
  backgroundcolorx = "white",
  buttons = [],
  backbutton = false,
  backaction,
}) => {
  // Ensure only up to 4 buttons are rendered
  const limitedButtons = buttons.slice(0, 4);
  const navigation = useNavigation();
  const { theme } = useTheme();
  const handleBackPress = () => {
    navigation.goBack();
  };
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors[backgroundcolorx] || "primary" }, // Resolving color from theme
      ]}
    >
      <View style={styles.title}>
        {backbutton && (
          <TouchableOpacity
            style={styles.backbutton}
            onPress={backaction ? backaction : handleBackPress}
          >
            <Icon name="backsolid" color={theme.colors.white} size={28} />
          </TouchableOpacity>
        )}
        <Typography
          numberOfLines={1}
          size={20}
          weight="SG"
          ellipsizeMode={"tail"}
          color={labelColor}
        >
          {title}
        </Typography>
      </View>
      <View style={styles.buttonsContainer}>
        {limitedButtons.map((button, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={button.onPress}
          >
            {button.label && (
              <Typography style={styles.buttonLabel}>{button.label}</Typography>
            )}
            {button.icon && (
              <Icon name={button.icon} color={theme.colors.white} />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 14,
    // borderBottomWidth: 1,
    borderBottomColor: "#f8f8f8", // Header border color
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  backbutton: {
    paddingHorizontal: 10,
  },
  button: {
    marginLeft: 5,
    paddingVertical: 6,
    paddingHorizontal: 5,
    borderRadius: 4,
  },
  buttonLabel: {
    color: "#ffff",
    fontSize: 16,
  },
});

export default Header;
