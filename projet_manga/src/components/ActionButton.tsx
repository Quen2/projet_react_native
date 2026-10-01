import {Animated, Pressable, Text, View} from "react-native";
import {usePressScale} from "@/hooks/usePressScale";

type ActionButtonProps = {
    label: string;
    onPress: () => void;
    disabled?: boolean;
};

export default function ActionButton ({label, onPress, disabled = false}: ActionButtonProps) {
    const {scale, pressIn, pressOut} = usePressScale();

    return (
        <Pressable
            onPress={onPress}
            onPressIn={pressIn}
            onPressOut={pressOut}
            disabled={disabled}
            accessibilityRole="button"
            className={`h-12 ${disabled ? "opacity-40" : ""}`}
        >
            <Animated.View style={{flex: 1, justifyContent: "center", transform: [{scale}]}}>
                <View className="absolute inset-0 rotate-1 bg-shade" />
                <View className="absolute inset-0 -rotate-1 bg-primary" />
                <Text className="text-center font-bungee text-sm text-night">{label}</Text>
            </Animated.View>
        </Pressable>
    )
}
