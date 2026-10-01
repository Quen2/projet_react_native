import {Text, TextInput, View} from "react-native";
import {useState} from "react";
import {useAuth} from "@/context/AuthContext";
import ActionButton from "@/components/ActionButton";

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
            <Text className="font-inter-semibold text-sm text-ink">Nom d'utilisateur</Text>
            <TextInput
                value={username}
                onChangeText={(text) => {
                    setUsername(text);
                    setMessage(null);
                }}
                placeholder="Entrez votre nom d'utilisateur...."
                autoCapitalize="none"
                className="mt-2 h-12 border-b-[3px] border-ink bg-deep px-3 font-inter text-sm text-ink placeholder:text-outline"
            />

            {message ? (
                <Text
                    className="mt-3 self-start bg-accent px-2 py-1 font-inter-semibold text-xs text-night"
                >
                    {message.text}
                </Text>
            ) : null}

            <View className="mt-5">
                <ActionButton label="Modifier mes informations" onPress={handleSubmit} disabled={!hasChanged} />
            </View>
        </View>
    );
}