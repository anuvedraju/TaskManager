import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "@/utils/theme";
import Icon from "@/components/icon";
import Typography from "@/components/typography";
import { logoutUser } from "@/api/authentication";
import { useTheme } from "@/components/themecontext";
import Header from "@/components/header";
import { router } from "expo-router";

const Menu = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();

  const menuItems = [
    { name: "Account", icon: "profile", color: colors.primary, route: "/protected/profiledetails" },
    { name: "Settings", icon: "settings", color: theme.colors.black, route: "/protected/profiledetails" },
    { name: "Privacy and Security", icon: "lock", color: colors.success, route: "/protected/profiledetails" },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Header
        title="Menu"
        backgroundcolorx="primary"
        labelColor="white"
        backbutton
        buttons={[{ icon: "close", onPress: () => navigation.goBack() }]}
      />

      {menuItems.map(({ name, icon, color, route }) => (
        <MenuButton key={name} icon={icon} text={name} color={color} onPress={() => router.push(route)} />
      ))}

      {/* Logout Button */}
      <MenuButton icon="exit" text="Logout" color="#FF3B30" onPress={logoutUser} textColor="error" />
    </View>
  );
};

const MenuButton = ({ icon, text, color, onPress, textColor = "black" }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Icon name={icon} size={24} color={color} />
    <Typography style={styles.buttonText} color={textColor}>
      {text}
    </Typography>
  </TouchableOpacity>
);

export default Menu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.white,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
    width: "90%",
  },
  buttonText: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: "500",
  },
});