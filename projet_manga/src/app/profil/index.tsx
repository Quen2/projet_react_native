import {KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View} from "react-native";
import {useState} from "react";
import {router} from "expo-router";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {useAuth} from "@/context/AuthContext";
import UpdateUser from "@/views/UpdateUser";
import EditInfosForm from "@/components/EditFiltersForm";
import TabBar from "@/components/TabBar";
import FavoritesList from "@/components/FavoritesList";
import SectionTitle from "@/components/SectionTitle";
import ActionButton from "@/components/ActionButton";
import Halftone from "@/components/Halftone";

type View_ = "profile" | "users";

export default function ProfilPage() {
    const {user, logout} = useAuth();
    const insets = useSafeAreaInsets();
    const [currentView, setCurrentView] = useState<View_>("profile");

    if (!user) return null;

    const isAdmin = user.role === "admin";
    const showUsers = isAdmin && currentView === "users";

    const handleLogout = async () => {
        await logout();
        router.replace("/");
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1 bg-background"
        >
            <View className="bg-deep" style={{height: insets.top}} />
            <Halftone />

            <ScrollView
                contentContainerClassName="flex-grow px-6 py-6"
                keyboardShouldPersistTaps="handled"
            >
                <View className="w-full max-w-md flex-grow self-center">
                    <SectionTitle title="Profil" large />

                    <View className="mt-8 flex-row items-center bg-surface p-4">
                        <View className="h-12 w-12 -rotate-6 items-center justify-center bg-accent">
                            <Text className="font-bungee text-lg text-night">
                                {user.username.charAt(0).toUpperCase()}
                            </Text>
                        </View>

                        <View className="ml-3 flex-1">
                            <View className="flex-row items-center gap-2">
                                <Text className="font-inter-semibold text-base text-ink" numberOfLines={1}>
                                    {user.username}
                                </Text>
                                {isAdmin ? (
                                    <View className="rotate-3 bg-accent px-1.5">
                                        <Text className="font-bungee text-[10px] text-night">Admin</Text>
                                    </View>
                                ) : null}
                            </View>
                            <Text className="mt-0.5 font-inter text-xs text-outline" numberOfLines={1}>
                                {user.email}
                            </Text>
                        </View>
                    </View>

                    {isAdmin ? (
                        <View className="mt-8 h-11 flex-row bg-deep">
                            {([
                                {key: "profile", label: "Mon profil"},
                                {key: "users", label: "Utilisateurs"},
                            ] as const).map((option) => {
                                const active = currentView === option.key;
                                return (
                                    <Pressable
                                        key={option.key}
                                        onPress={() => setCurrentView(option.key)}
                                        className={`flex-1 items-center justify-center ${
                                            active ? "bg-accent" : ""
                                        }`}
                                    >
                                        <Text
                                            className={`font-bungee text-xs ${
                                                active ? "text-night" : "text-ink"
                                            }`}
                                        >
                                            {option.label}
                                        </Text>
                                    </Pressable>
                                );
                            })}
                        </View>
                    ) : null}

                    <View className="mt-8 flex-1">
                        <SectionTitle title={showUsers ? "Gestion des utilisateurs" : "Mes informations"} />

                        <View className="mt-4 bg-surface p-4">
                            {showUsers ? (
                                <Text className="font-inter text-sm text-ink">Je modifie les utilisateurs</Text>
                            ) : (
                                <View>
                                    <UpdateUser />
                                    <EditInfosForm />
                                </View>
                            )}
                        </View>
                    </View>

                    <View className="mt-10">
                        <ActionButton label="Se déconnecter" onPress={handleLogout} />
                    </View>

                    <FavoritesList />
                </View>
            </ScrollView>
            <TabBar />
        </KeyboardAvoidingView>
    );
}