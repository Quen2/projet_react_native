import { Text, View, StyleSheet } from "react-native";
import SignIn from "@/components/SignIn";
import SignUp from "@/components/SignUp";
import Homepage from "@/views/Homepage";

export default function Index() {
  const connected = false;
  const hasAnAccount = true;

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
