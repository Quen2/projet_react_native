import {Pressable, Text, TextInput, View} from "react-native";
import {use, useState} from "react";
import {createUser} from "@/api/user/createUser";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignUp () {
    const [username, setUsername] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const submitUserCreation = async () => {
        const createdUser = createUser(username, email, password);
        await AsyncStorage.setItem("user", JSON.stringify(createdUser));
    }

    return (
        <View>
            <Text>Create an Account</Text>
            <TextInput placeholder={"Username"} onChangeText={setUsername} />
            <TextInput placeholder={"Email"} onChangeText={setEmail} />
            <TextInput placeholder={"Password"} onChangeText={setPassword} />
            <Pressable onPress={submitUserCreation}>
                <Text>
                    Sign up
                </Text>
            </Pressable>
            <Text>
                Already have an account ? Sign in
            </Text>
        </View>
    )
}