import * as eva from "@eva-design/eva";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { useFonts } from "expo-font";
import { Redirect, Slot, SplashScreen } from "expo-router";
import { useEffect } from "react";
import { QueryClientProvider } from "react-query";
import Colors from "../constants/Colors";
import { SessionProvider } from "../contexts/ctx";
import { queryClient } from "../services/queryClient";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    antoutline: require("@ant-design/icons-react-native/fonts/antoutline.ttf"),
    antfill: require("@ant-design/icons-react-native/fonts/antfill.ttf"),
    "opensans-regular": require("../assets/fonts/opensans-regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...Colors.light }}>
        <QueryClientProvider client={queryClient}>
          <SessionProvider>
            <Redirect href={"/dashboard"} />
            <Slot />
          </SessionProvider>
        </QueryClientProvider>
      </ApplicationProvider>
    </ThemeProvider>
  );
}
