import {Pressable, Text, View} from "react-native";
import {Href, router, usePathname} from "expo-router";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {Ionicons} from "@expo/vector-icons";
import {palette} from "@/theme/palette";

const TABS = [
    {href: "/" as Href, label: "Accueil", icon: "home"},
    {href: "/profil" as Href, label: "Profil", icon: "person"},
] as const;

export default function TabBar () {
    const pathname = usePathname();
    const insets = useSafeAreaInsets();

    const openTab = (href: Href) => {
        if (href === pathname) return;

        if (href === "/") router.dismissTo("/");
        else router.push(href);
    }

    return (
        <View
            className="flex-row bg-deep pt-2"
            style={{paddingBottom: insets.bottom + 12}}
        >
            {TABS.map((tab) => {
                const active = tab.href === pathname;

                return (
                    <Pressable key={tab.label} onPress={() => openTab(tab.href)} className="flex-1 items-center">
                        <View className="h-9 w-16 items-center justify-center">
                            {active ? <View className="absolute inset-0 -rotate-3 bg-primary" /> : null}
                            <Ionicons
                                name={active ? tab.icon : `${tab.icon}-outline`}
                                size={24}
                                color={active ? palette.night : palette.ink}
                            />
                        </View>
                        <Text className={`mt-1 font-bungee text-xs ${active ? "text-primary" : "text-ink"}`}>
                            {tab.label}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    )
}
