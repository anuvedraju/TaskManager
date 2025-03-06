import { useRouter } from "expo-router";
import { useEffect, useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  StatusBar,
} from "react-native";
import Typography from "@/components/typography";
import { useTheme } from "@/components/themecontext";
import { DIMENSIONS } from "@/utils/theme";
import CButton from "@/components/button";
import CTextInput from "@/components/textinput";
import Icon from "@/components/icon";
import { loginUser } from "@/api/authentication";
import { useDispatch, useSelector } from "react-redux";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "@/redux/slices/authSlice";

export default function LoginScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, loading, error, token } = useSelector(
    (state: any) => state.auth
  );
  const { theme } = useTheme();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleLogin = useCallback(async () => {
    if (!credentials.email || !credentials.password) {
      dispatch(loginFailure("Please fill in all fields"));
      return;
    }
    dispatch(loginFailure(""));
    dispatch(loginStart());

    try {
      const loginResponse = await loginUser(
        credentials.email,
        credentials.password
      );
      if (loginResponse) {
        console.log("Login successful:", loginResponse);
        dispatch(
          loginSuccess({
            user: loginResponse.user,
            token: loginResponse.accessToken,
          })
        );
        router.replace("/protected/tasks");
      } else {
        dispatch(loginFailure("Invalid email or password. Please try again."));
        dispatch(loginFailure("Invalid credentials"));
      }
    } catch (error: any) {
      dispatch(loginFailure("An error occurred. Please try again."));
      dispatch(loginFailure(error.message));
    }
  }, [credentials, dispatch, router]);

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
        <Typography
          color={[theme.colors.primary, theme.colors.secondary]}
          size={DIMENSIONS.wp(25)}
          style={styles.logotext}
          fontFamily="SourGummy-ExtraBold"
        >
          TaskManager
        </Typography>

        <View
          style={[
            styles.inputContainer,
            { backgroundColor: theme.colors.background },
          ]}
        >
          <Typography
            color="textSecondary"
            weight="BLD"
            size={20}
            style={styles.label}
          >
            Login
          </Typography>
          <View style={styles.textInputContainer}>
            <CTextInput
              value={credentials.email}
              placeholder="Email"
              onChangeText={(text) =>
                setCredentials((prev) => ({ ...prev, email: text }))
              }
              textColor={theme.colors.black}
              errorText={error}
              border={false}
              backgroundColor={theme.colors.white}
            />
            <CTextInput
              value={credentials.password}
              placeholder="Password"
              onChangeText={(text) =>
                setCredentials((prev) => ({ ...prev, password: text }))
              }
              textColor={theme.colors.black}
              backgroundColor={theme.colors.white}
              secure
              border={false}
              errorText={error}
            />
          </View>

          <CButton
            label="Login"
            buttonColor="secondary"
            labelColor="black"
            onPress={handleLogin}
            style={styles.button}
          />
          {error && <Typography style={{ color: "red" }}>{error}</Typography>}
          <Typography color="secondary" weight="SG" style={styles.welcomeText}>
            Login to see your tasks!!
          </Typography>

          <View style={styles.lineContainer}>
            <View style={styles.line} />
            <Typography size={10} color="black" style={styles.lineText}>
              Or Log In with
            </Typography>
            <View style={styles.line} />
          </View>

          <TouchableOpacity style={styles.socialLogin}>
            <Icon name="googlelogo" color={theme.colors.black} />
            <Typography size={10} color="black" style={styles.socialText}>
              Google
            </Typography>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => router.replace("/auth/signup")}
          >
            <Typography color="black" size={12}>
              {`Don't have an account? `}
              <Typography color="textSecondary" weight="BLD" size={14}>
                SignUp
              </Typography>
            </Typography>
          </TouchableOpacity>
        </View>

        <Typography size={10} style={styles.footer}>
          "© 2025 TaskManager. All rights reserved. | Privacy Policy"
        </Typography>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  logotext: {
    marginTop: "10%",
  },
  inputContainer: {
    justifyContent: "center",
    paddingHorizontal: 16,
    alignItems: "center",
    gap: 10,
  },
  label: {
    alignSelf: "center",
    marginBottom: 20,
  },
  textInputContainer: {
    gap: 10,
    alignItems: "center",
  },
  button: {
    marginTop: 20,
    width: "80%",
    alignSelf: "center",
  },
  welcomeText: {
    textAlign: "center",
    paddingTop: 20,
  },
  lineContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: "grey",
  },
  lineText: {
    marginHorizontal: 10,
  },
  socialLogin: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  socialText: {
    margin: 10,
  },
  registerButton: {
    alignItems: "center",
    marginTop: 20,
  },
  footer: {
    textAlign: "center",
    marginTop: 20,
    paddingBottom: 10,
  },
});
