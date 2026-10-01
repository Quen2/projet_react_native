import {KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View} from "react-native";
import {useState} from "react";
import {router} from "expo-router";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {useAuth} from "@/context/AuthContext";
import UpdateUser from "@/views/UpdateUser";
import EditInfosForm from "@/components/EditFiltersForm";
import TabBar from "@/components/TabBar";
import FavoritesList from "@/components/FavoritesList";

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
            <View className="bg-white" style={{height: insets.top}} />

            <ScrollView
                contentContainerClassName="flex-grow px-6 py-6"
                keyboardShouldPersistTaps="handled"
            >
                <View className="w-full max-w-md flex-grow self-center">
                    <Text className="font-inter-semibold text-[28px] leading-[34px] text-ink">
                        Profil
                    </Text>

                    <View className="mt-6 flex-row items-center rounded-lg border-[0.5px] border-outline bg-white p-4">
                        <View className="h-12 w-12 items-center justify-center rounded-full bg-primary">
                            <Text className="font-inter-semibold text-lg text-white">
                                {user.username.charAt(0).toUpperCase()}
                            </Text>
                        </View>

                        <View className="ml-3 flex-1">
                            <View className="flex-row items-center gap-2">
                                <Text className="font-inter-semibold text-base text-ink" numberOfLines={1}>
                                    {user.username}
                                </Text>
                                {isAdmin ? (
                                    <View className="ml-2 rounded border-[0.5px] border-primary px-1.5 py-0.5">
                                        <Text className="font-inter-medium text-xs text-primary">Admin</Text>
                                    </View>
                                ) : null}
                            </View>
                            <Text className="mt-0.5 font-inter text-xs text-ink" numberOfLines={1}>
                                {user.email}
                            </Text>
                        </View>
                    </View>

                    {isAdmin ? (
                        <View className="mt-6 h-10 flex-row rounded-lg border-[0.5px] border-outline bg-white p-1">
                            {([
                                {key: "profile", label: "Mon profil"},
                                {key: "users", label: "Utilisateurs"},
                            ] as const).map((option) => {
                                const active = currentView === option.key;
                                return (
                                    <Pressable
                                        key={option.key}
                                        onPress={() => setCurrentView(option.key)}
                                        className={`flex-1 items-center justify-center rounded-md ${
                                            active ? "bg-primary" : ""
                                        }`}
                                    >
                                        <Text
                                            className={`font-inter-medium text-sm ${
                                                active ? "text-white" : "text-ink"
                                            }`}
                                        >
                                            {option.label}
                                        </Text>
                                    </Pressable>
                                );
                            })}
                        </View>
                    ) : null}

                    <View className="mt-6 flex-1">
                        <Text className="font-inter-semibold text-sm text-ink">
                            {showUsers ? "Gestion des utilisateurs" : "Mes informations"}
                        </Text>

                        <View className="mt-2 bg-white p-4">
                            {showUsers ? (
                                <Text className="font-inter text-xs text-ink">Je modifie les utilisateurs</Text>
                            ) : (
                                <View>
                                    <UpdateUser />
                                    <EditInfosForm />
                                </View>
                            )}
                        </View>
                    </View>

                    <Pressable
                        onPress={handleLogout}
                        className="mt-8 h-10 items-center justify-center rounded-lg bg-primary px-4 active:opacity-80"
                        style={{boxShadow: "0px 2px 8px rgba(24, 28, 20, 0.1)"}}
                    >
                        <Text className="font-inter-medium text-base text-white">Se déconnecter</Text>
                    </Pressable>

                    <FavoritesList />
                </View>
            </ScrollView>
            <TabBar />
        </KeyboardAvoidingView>
    );
}