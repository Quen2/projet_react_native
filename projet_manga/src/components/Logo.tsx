import {Animated, Easing, Text, View} from "react-native";
import {useEffect, useRef} from "react";
import {useReducedMotion} from "react-native-reanimated";

export default function Logo () {
    const spin = useRef(new Animated.Value(0)).current;
    const reducedMotion = useReducedMotion();

    useEffect(() => {
        if (reducedMotion) return;

        Animated.timing(spin, {
            toValue: 1,
            duration: 1100,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
        }).start();
    }, []);

    const rotate = spin.interpolate({inputRange: [0, 1], outputRange: ["0deg", "720deg"]});

    return (
        <View className="flex-row items-center self-start">
            <Animated.View style={{transform: [{rotate}]}}>
                <View className="h-11 w-11 overflow-hidden rounded-full bg-[#7F88B5]">
                    <View className="absolute -left-1.5 -top-1.5 h-11 w-11 rounded-full bg-[#D5DCF0]" />
                    <View className="absolute left-2 top-2 h-2.5 w-2.5 rounded-full bg-ink" />
                </View>
            </Animated.View>
            <View className="ml-5 px-3 py-1">
                <View className="absolute inset-0 rotate-3 bg-shade" />
                <View className="absolute inset-0 -rotate-2 bg-primary" />
                <Text className="font-bungee text-2xl leading-8 text-night">Steel Ball</Text>
            </View>
            <Text className="ml-4 mt-6 font-bungee text-sm text-ink">app</Text>
        </View>
    )
}
