import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
} from "react-native";
import CTextInput from "../../components/textinput";
import CButton from "../../components/button";
import Typography from "../../components/typography";
import Icon from "../../components/icon";
import { colors, DIMENSIONS } from "../../utils/theme";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../../components/themecontext";
import { SignupData, signupUser } from "@/api/authentication";

export default function SignupScreen() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();
  const { theme } = useTheme();

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSignup = () => {
    if (
      !form.username ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError("Please fill in all fields");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    signup();

  };

  const signup = async () => {
    const signupData: SignupData = {
      username: form.username,
      password: form.password,
      email: form.email,
    };

    const result = await signupUser(signupData);
    if (result) {
      console.log("Signup successful:", result.message);
      router.replace("/auth/login");
    } else {
      console.log("Signup failed.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar
        backgroundColor={theme.colors.background}
        barStyle={theme.dark ? "light-content" : "dark-content"}
      />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >

        <LinearGradient
          colors={[theme.colors.background, theme.colors.background]}
          style={styles.logo}
        >
          <Typography
            color={[theme.colors.primary, theme.colors.secondary]}
            size={DIMENSIONS.wp(20)}
            style={styles.logotext}
            fontFamily="SourGummy-ExtraBold"
          >
            TaskManager
          </Typography>
        </LinearGradient>


        <View style={styles.inputContainer}>
          <Typography
            style={styles.label}
            color="textSecondary"
            weight="BLD"
            size={20}
          >
            Sign Up
          </Typography>

          {["username", "email", "password", "confirmPassword"].map((field) => (
            <CTextInput
              key={field}
              value={form[field]}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              onChangeText={(value) => handleChange(field, value)}
              textColor={theme.colors.black}
              style={styles.input}
              errorText={error}
              backgroundColor={theme.colors.white}
              border={false}
              keyboardType={field === "email" ? "email-address" : "default"}
              secure={field.includes("password")}
            />
          ))}

          <CButton
            label="Sign Up"
            buttonColor="secondary"
            onPress={handleSignup}
            style={styles.button}
          />


          <View style={styles.lineContainer}>
            <View style={styles.line} />
            <Typography size={10} style={styles.dividerText}>
              Or Sign Up with
            </Typography>
            <View style={styles.line} />
          </View>


          <TouchableOpacity style={styles.socialLogin}>
            <Icon name="googlelogo" color={theme.colors.black} />
            <Typography size={10} style={{ margin: 5 }}>
              Google
            </Typography>
          </TouchableOpacity>


          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => router.replace("/auth/login")}
          >
            <Typography size={12}>
              Already have an account?{" "}
              <Typography color="textSecondary" weight="BLD" size={14}>
                Login
              </Typography>
            </Typography>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: { flexGrow: 1 },
  button: { marginTop: 20, width: "80%", alignSelf: "center" },
  label: { alignSelf: "center", marginVertical: 20 },
  logotext: { fontFamily: "SourGummy-ExtraBold", marginTop: "10%" },
  logo: {
    alignItems: "center",
    width: "100%",
    height: DIMENSIONS.hp(20),
    justifyContent: "center",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    overflow: "hidden",
  },
  lineContainer: { flexDirection: "row", alignItems: "center", marginTop: 40 },
  line: { flex: 1, height: 2, backgroundColor: colors.grey },
  dividerText: { marginHorizontal: 10 },
  inputContainer: {
    justifyContent: "center",
    paddingHorizontal: 16,
    alignItems: "center",
    gap: 10,
  },
  socialLogin: { alignItems: "center", margin: 20, flexDirection: "row" },
  registerButton: { alignItems: "center", marginTop: 10 },
});
