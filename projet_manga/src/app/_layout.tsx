import "@/theme/global.css";

import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useFonts, Inter_300Light, Inter_400Regular, Inter_500Medium, Inter_600SemiBold } from "@expo-google-fonts/inter";
import { Bungee_400Regular } from "@expo-google-fonts/bungee";
import { useState } from "react";
import {AuthProvider} from "@/context/AuthContext";
import {FavoritesProvider} from "@/context/FavoritesContext";
import AnimatedSplash from "@/components/AnimatedSplash";
import "@/i18n";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({ Inter_300Light, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Bungee_400Regular });
  const [splashFinished, setSplashFinished] = useState<boolean>(false);

  if (!fontsLoaded) return null;

  if (!splashFinished) return <AnimatedSplash onFinish={() => setSplashFinished(true)} />;

  return <AuthProvider>
    <FavoritesProvider>
      <Stack screenOptions={{headerShown: false}} />
    </FavoritesProvider>
  </AuthProvider>
}
