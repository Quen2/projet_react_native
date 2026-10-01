import {Animated, Easing, View} from "react-native";
import {useRef} from "react";
import * as SplashScreen from "expo-splash-screen";
import Logo from "@/components/Logo";
import Halftone from "@/components/Halftone";

type AnimatedSplashProps = {
    onFinish: () => void;
};

export default function AnimatedSplash ({onFinish}: AnimatedSplashProps) {
    const rotation = useRef(new Animated.Value(0)).current;

    const startAnimation = () => {
        SplashScreen.hideAsync();

        Animated.timing(rotation, {
            toValue: 1,
            duration: 1800,
            delay: 500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
        }).start(onFinish);
    }

    const rotate = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "1080deg"],
    });

    return (
        <View className="flex-1 items-center justify-center bg-background">
            <Halftone />
            <Animated.Image
                source={require("@/assets/images/splash.png")}
                onLoadEnd={startAnimation}
                style={{width: 200, height: 200, transform: [{rotate}]}}
            />
            <View className="mt-10">
                <Logo />
            </View>
        </View>
    )
}
