import {Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {use, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {createUser} from "@/api/user/userStorage";
import {useAuth} from "@/context/AuthContext";
import Logo from "@/components/Logo";
import SectionTitle from "@/components/SectionTitle";
import Halftone from "@/components/Halftone";
import ActionButton from "@/components/ActionButton";

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
            <View className="bg-deep" style={{height: insets.top}} />
            <Halftone />
            <ScrollView contentContainerClassName="flex-grow px-6 py-6" keyboardShouldPersistTaps="handled">
                <View className="w-full max-w-md flex-grow self-center">
                    <View className="flex-1 justify-center">
                        <Logo />
                        <View className="mt-10">
                            <SectionTitle title="Créer un compte" large />
                        </View>

                        <Text className="mt-6 font-inter-semibold text-sm text-ink">Nom d'utilisateur</Text>
                        <TextInput
                            placeholder="Entrez votre nom d'utilisateur...."
                            onChangeText={setUsername}
                            autoCapitalize="none"
                            className="mt-2 h-12 border-b-[3px] border-ink bg-deep px-3 font-inter text-sm text-ink placeholder:text-outline"
                        />

                        <Text className="mt-3 font-inter-semibold text-sm text-ink">Email</Text>
                        <TextInput
                            placeholder="Entrez votre email...."
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            className="mt-2 h-12 border-b-[3px] border-ink bg-deep px-3 font-inter text-sm text-ink placeholder:text-outline"
                        />

                        <Text className="mt-3 font-inter-semibold text-sm text-ink">Mot de passe</Text>
                        <View className="mt-2 h-12 flex-row items-center border-b-[3px] border-ink bg-deep pl-3">
                            <TextInput
                                placeholder="Entrez votre mot de passe...."
                                onChangeText={setPassword}
                                secureTextEntry={hidden}
                                className="h-full flex-1 font-inter text-sm text-ink placeholder:text-outline"
                            />
                            <Pressable
                                onPress={() => setHidden(!hidden)}
                                className="h-full w-12 items-center justify-center bg-ink"
                            >
                                <Image source={require("@/assets/images/auth/eye.png")} style={{width: 24, height: 24}} />
                            </Pressable>
                        </View>
                        {
                            errorMessage ?
                                <Text className="mt-3 self-start bg-accent px-2 py-1 font-inter-semibold text-xs text-night">{errorMessage}</Text> : null
                        }

                        <View className="mt-6">
                            <ActionButton label="S'inscrire" onPress={submitUserCreation} />
                        </View>

                        <Text className="mt-6 text-center font-inter text-sm text-ink">
                            Déjà un compte ?{" "}
                            <Text className="font-inter-semibold text-accent underline" onPress={onSwitch}>Se connecter</Text>
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}
