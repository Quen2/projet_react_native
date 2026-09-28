import {Text, View, StyleSheet, Pressable} from "react-native";
import SignIn from "@/components/SignIn";
import SignUp from "@/components/SignUp";
import Homepage from "@/views/Homepage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect, useState} from "react";

export default function Index() {
  const [connected, setConnected] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasAnAccount, setHasAnAccount] = useState<boolean>(true)

  const switchLogin = () => {
    setHasAnAccount(!hasAnAccount);
  }

  useEffect(() => {
    const checkConnected = async () => {
      try {
        const user = await AsyncStorage.getItem("user");
        setConnected(user)
      } finally {
        setLoading(false);
      }
    }
    checkConnected();
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-white">
      {
        connected ?
            <View>
              <Homepage />
            </View> : <View>
              {
                hasAnAccount ? <View>
                  <SignIn />
                  <Pressable onPress={switchLogin}>
                    <Text>Pas de compte ? Créez en un</Text>
                  </Pressable>
                </View> : <View>
                  <SignUp />
                </View>
              }
            </View>
      }
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
