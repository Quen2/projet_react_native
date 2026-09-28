import "@/theme/global.css";

import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useFonts, Inter_300Light, Inter_400Regular, Inter_500Medium, Inter_600SemiBold } from "@expo-google-fonts/inter";
import { useEffect } from "react";
import {AuthProvider} from "@/context/AuthContext";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({ Inter_300Light, Inter_400Regular, Inter_500Medium, Inter_600SemiBold });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return <AuthProvider>
    <Stack screenOptions={{headerShown: false}} />
  </AuthProvider>
}
