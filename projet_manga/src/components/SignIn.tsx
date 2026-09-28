import {Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {getUser} from "@/api/user/userStorage";
import {useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type SignInProps = {
    onSwitch: () => void;
};

export default function SignIn ({onSwitch}: SignInProps) {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("")
    const [hidden, setHidden] = useState<boolean>(true);
    const insets = useSafeAreaInsets();

    const logUser = async () => {
        const user = await getUser(email, password)
        await AsyncStorage.setItem("user", JSON.stringify(user));

        if (!user) {
            setErrorMessage("Mauvaise combinaison email/mot de passe");
        }
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1 bg-background">
            <View className="bg-white" style={{height: insets.top}} />
            <ScrollView contentContainerClassName="flex-grow px-6 py-6" keyboardShouldPersistTaps="handled">
                <View className="w-full max-w-md flex-grow self-center">
                    <View className="flex-1 justify-center">
                        <Text className="font-inter-semibold text-[28px] leading-[34px] text-ink">Connexion</Text>

                        <Text className="mt-6 font-inter-semibold text-sm text-ink">Nom d'utilisateur ou email</Text>
                        <TextInput
                            placeholder="Entrez votre nom d'utilisateur ou email...."
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
                        {
                            errorMessage ?
                                <Text className="mt-2 font-inter-light text-[10px] text-ink">*{errorMessage}</Text> : null
                        }

                        <Pressable
                            onPress={logUser}
                            className="mt-5 h-10 items-center justify-center rounded-lg bg-primary px-4"
                            style={{boxShadow: "0px 2px 8px rgba(24, 28, 20, 0.1)"}}
                        >
                            <Text className="font-inter-medium text-base text-white">Se connecter</Text>
                        </Pressable>

                        <Text className="mt-6 text-center font-inter text-sm text-ink">
                            Pas de compte ?{" "}
                            <Text className="font-inter-semibold text-primary underline" onPress={onSwitch}>S'inscrire</Text>
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}
