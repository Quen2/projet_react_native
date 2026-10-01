import {Pressable, Text, TextInput, View} from "react-native";
import {useState} from "react";
import {useAuth} from "@/context/AuthContext";

export default function EditInfosForm() {
    const {user, updateUser} = useAuth();
    const [username, setUsername] = useState<string>(user?.username ?? "");
    const [message, setMessage] = useState<{text: string; error: boolean} | null>(null);

    const trimmed = username.trim();
    const hasChanged = trimmed !== user?.username;

    const handleSubmit = async () => {
        if (!trimmed) {
            setMessage({text: "Le pseudo ne peut pas être vide", error: true});
            return;
        }
        await updateUser({username: trimmed});
        setMessage({text: "Informations mises à jour", error: false});
    };

    return (
        <View>
            <Text className="mt-4 font-inter-semibold text-sm text-ink">Nom d'utilisateur</Text>
            <TextInput
                value={username}
                onChangeText={(text) => {
                    setUsername(text);
                    setMessage(null);
                }}
                placeholder="Entrez votre nom d'utilisateur...."
                autoCapitalize="none"
                className="mt-2 h-12 rounded border-[0.5px] border-outline bg-white px-2 font-inter text-xs text-ink placeholder:text-outline"
            />

            {message ? (
                <Text
                    className={`mt-2 font-inter text-xs ${
                        message.error ? "text-red-700" : "text-primary"
                    }`}
                >
                    {message.error ? "*" : ""}{message.text}
                </Text>
            ) : null}

            <Pressable
                onPress={handleSubmit}
                disabled={!hasChanged}
                className={`mt-5 h-10 items-center justify-center rounded-lg bg-primary px-4 ${
                    hasChanged ? "active:opacity-80" : "opacity-50"
                }`}
                style={{boxShadow: "0px 2px 8px rgba(24, 28, 20, 0.1)"}}
            >
                <Text className="font-inter-medium text-base text-white">Modifier mes informations</Text>
            </Pressable>
        </View>
    );
}