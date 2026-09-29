import {Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {use, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {createUser} from "@/api/user/userStorage";
import {useAuth} from "@/context/AuthContext";

type SignUpProps = {
    onSwitch: () => void;
};

export default function SignUp ({onSwitch}: SignUpProps) {
    const [username, setUsername] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [hidden, setHidden] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>("")
    const insets = useSafeAreaInsets();
    const { login } = useAuth();

    const submitUserCreation = async () => {
        try {
            await createUser(username, email, password);
            await AsyncStorage.removeItem("filters");
            await login(email, password);
        } catch (e) {
            setErrorMessage((e as Error).message);
        }
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1 bg-background">
            <View className="bg-white" style={{height: insets.top}} />
            <ScrollView contentContainerClassName="flex-grow px-6 py-6" keyboardShouldPersistTaps="handled">
                <View className="w-full max-w-md flex-grow self-center">
                    <View className="flex-1 justify-center">
                        <Text className="font-inter-semibold text-2xl leading-[29px] text-ink">Créer un compte</Text>

                        <Text className="mt-6 font-inter-semibold text-sm text-ink">Nom d'utilisateur</Text>
                        <TextInput
                            placeholder="Entrez votre nom d'utilisateur...."
                            onChangeText={setUsername}
                            autoCapitalize="none"
                            className="mt-2 h-12 rounded border-[0.5px] border-outline bg-white px-2 font-inter text-xs text-ink placeholder:text-outline"
                        />

                        <Text className="mt-3 font-inter-semibold text-sm text-ink">Email</Text>
                        <TextInput
                            placeholder="Entrez votre email...."
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            className="mt-2 h-12 rounded border-[0.5px] border-outline bg-white px-2 font-inter text-xs text-ink placeholder:text-outline"
                        />

                        <Text className="mt-3 font-inter-semibold text-sm text-ink">Mot de passe</Text>
                        <View className="mt-2 h-12 flex-row items-center rounded border-[0.5px] border-outline bg-white pl-2">
                            <TextInput
                                placeholder="Entrez votre mot de passe...."
                                onChangeText={setPassword}
                                secureTextEntry={hidden}
                                className="h-full flex-1 font-inter text-xs text-ink placeholder:text-outline"
                            />
                            <Pressable
                                onPress={() => setHidden(!hidden)}
                                className="h-12 w-12 items-center justify-center rounded border-[0.5px] border-outline bg-white"
                            >
                                <Image source={require("@/assets/images/auth/eye.png")} style={{width: 24, height: 24}} />
                            </Pressable>
                        </View>

                        <Pressable
                            onPress={submitUserCreation}
                            className="mt-6 h-10 items-center justify-center rounded-lg bg-primary px-4"
                            style={{boxShadow: "0px 2px 8px rgba(24, 28, 20, 0.1)"}}
                        >
                            <Text className="font-inter-medium text-base text-white">S'inscrire</Text>
                        </Pressable>

                        <Text className="mt-6 text-center font-inter text-sm text-ink">
                            Déjà un compte ?{" "}
                            <Text className="font-inter-semibold text-primary underline" onPress={onSwitch}>Se connecter</Text>
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}
