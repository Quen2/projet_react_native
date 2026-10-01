import {Pressable, Text, View} from "react-native";
import {Href, router, usePathname} from "expo-router";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {Ionicons} from "@expo/vector-icons";

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
            className="flex-row bg-white pt-3"
            style={{paddingBottom: insets.bottom + 12, boxShadow: "0px -2px 8px rgba(24, 28, 20, 0.06)"}}
        >
            {TABS.map((tab) => {
                const active = tab.href === pathname;

                return (
                    <Pressable key={tab.label} onPress={() => openTab(tab.href)} className="flex-1 items-center">
                        <Ionicons
                            name={active ? tab.icon : `${tab.icon}-outline`}
                            size={24}
                            color={active ? "#6F6557" : "#121926"}
                        />
                        <Text className={`mt-1 text-sm ${active ? "font-inter-medium text-primary" : "font-inter text-ink"}`}>
                            {tab.label}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    )
}
