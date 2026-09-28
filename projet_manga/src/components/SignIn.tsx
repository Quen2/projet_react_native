import {Pressable, Text, View} from "react-native";
import {getUser} from "@/api/user/getUser";
import {TextInput} from "@expo/ui";
import {useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignIn () {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("")

    const logUser = async () => {
        const user = getUser(email, password)
        if (user) {
            await AsyncStorage.setItem("user", JSON.stringify(user));
        } else {
            setErrorMessage("Mauvaise combinaison email/mot de passe");
        }
    }

    return (
        <View>
            <TextInput
                placeholder={"Email"}
                onChangeText={(mail: string) => setEmail(mail)}
                keyboardType={"email-address"}
            />
            <TextInput
                placeholder={"Mot de passe"}
                onChangeText={(password: string) => setPassword(password)}
                secureTextEntry={true}
            />
            <Pressable onPress={logUser}>
                <Text>Se connecter</Text>
            </Pressable>
            {
                errorMessage ?
                <Text>
                    {errorMessage}
                </Text> : null
            }
        </View>
    )
}