import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme, View } from "react-native";
import { ThemeProvider, useTheme } from "@/components/themecontext";
import * as Font from "expo-font";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "@/utils/theme";
import { loginSuccess } from "@/redux/slices/authSlice";
SplashScreen.preventAutoHideAsync();

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("../assets/fonts/Roboto/Roboto-Regular.ttf"),
    "open-sans-bold": require("../assets/fonts/Roboto/Roboto-Bold.ttf"), // ✅ Corrected path
    "lato-bold": require("../assets/fonts/Lato/Lato-Bold.ttf"),
    "lato-black": require("../assets/fonts/Lato/Lato-Black.ttf"),
    "SourGummy-ExtraBold": require("../assets/fonts/Sour_Gummy/static/SourGummy-Black.ttf"),
  });
};

export default function RootLayout() {
  const [appReady, setAppReady] = useState(false);
  const router = useRouter();
  const [fontLoaded, setFontLoaded] = useState(false);
  const systemTheme = useColorScheme(); // Returns 'light' or 'dark'
  const theme = useTheme().theme;
  const [expoPushToken, setExpoPushToken] = useState("");

  useEffect(() => {
    async function prepare() {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulated loading
      setAppReady(true);
      await SplashScreen.hideAsync();
    }
    prepare();
  }, []);
  useEffect(() => {
    const loadFonts = async () => {
      await fetchFonts();
      setFontLoaded(true);
      await SplashScreen.hideAsync(); // Hide the splash screen after fonts are loaded
    };
    loadFonts();
  }, []);

  return (
    <Provider store={store}>
      {appReady && (
        <ThemeProvider>
          <View
            style={{
              flex: 1,
              backgroundColor: theme.dark
                ? theme.colors.white
                : theme.colors.black,
            }}
          >
            <AppNavigator />
          </View>
        </ThemeProvider>
      )}
    </Provider>
  );
}

function AppNavigator() {
  const router = useRouter();

  const theme = useTheme().theme;
  const { user, loading, error } = useSelector((state: any) => state.auth);
  const token = AsyncStorage.getItem("access_token");
  const dispatch = useDispatch();
  useEffect(() => {
    if (token === null) {
      router.replace("/auth/login");
    } else {
      router.replace("/protected/tasks");
    }
  }, []);
  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        const token = await AsyncStorage.getItem("access_token");

        if (userData && token) {
          dispatch(loginSuccess({ user: JSON.parse(userData), token }));
        }
      } catch (error) {
        console.error("Failed to load user data from AsyncStorage:", error);
      }
    };

    loadUser();
  }, [dispatch]);
  return (
    <Stack
      screenOptions={{
        statusBarStyle: theme.dark ? "light" : "dark",
        navigationBarColor: theme.colors.background,
        animation: "fade",
        contentStyle: { backgroundColor: theme.colors.black }, // ✅ Prevents white flicker
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="auth/login"
        options={{
          headerShown: false,
          statusBarBackgroundColor: theme.colors.background,
          statusBarStyle: theme.dark ? "light" : "dark",
        }}
      />
      <Stack.Screen
        name="auth/signup"
        options={{
          headerShown: false,
          statusBarBackgroundColor: theme.colors.background,
          statusBarStyle: theme.dark ? "light" : "dark",
        }}
      />
      <Stack.Screen
        name="protected/profiledetails"
        options={{
          headerShown: false,
          statusBarBackgroundColor: theme.colors.background,
          statusBarStyle: theme.dark ? "light" : "dark",
        }}
      />
      <Stack.Screen
        name="protected/tasks"
        options={{
          headerShown: false,
          statusBarBackgroundColor: theme.colors.primary,
          statusBarStyle: theme.dark ? "light" : "dark",
        }}
      />
      <Stack.Screen
        name="protected/slidemenu"
        options={{
          headerShown: false,
          statusBarBackgroundColor: theme.colors.primary,
          statusBarStyle: theme.dark ? "light" : "dark",
        }}
      />
      <Stack.Screen
        name="protected/task-edit"
        options={{
          headerShown: false,
          statusBarBackgroundColor: theme.colors.primary,
          statusBarStyle: theme.dark ? "light" : "dark",
        }}
      />
      <Stack.Screen
        name="protected/searchtasks"
        options={{
          headerShown: false,
          statusBarBackgroundColor: theme.colors.primary,
          statusBarStyle: theme.dark ? "light" : "dark",
        }}
      />
    </Stack>
  );
}
