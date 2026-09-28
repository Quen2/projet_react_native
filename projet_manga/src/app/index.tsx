import {View, StyleSheet} from "react-native";
import SignIn from "@/components/SignIn";
import SignUp from "@/components/SignUp";
import Homepage from "@/views/Homepage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect, useState} from "react";
import {getUser} from "@/api/user/userStorage";
import {useAuth} from "@/context/AuthContext";

export default function Index() {
  const {isAuthenticated} = useAuth();
  const [hasAnAccount, setHasAnAccount] = useState<boolean>(true)

  const switchLogin = () => {
    setHasAnAccount(!hasAnAccount);
  }

  return (
      <View className="flex-1 bg-white">
        {
          isAuthenticated ? <Homepage />
              : hasAnAccount ? <SignIn onSwitch={switchLogin} />
                  : <SignUp onSwitch={switchLogin} />
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
