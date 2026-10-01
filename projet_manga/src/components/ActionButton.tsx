import {Pressable, Text, View} from "react-native";

type ActionButtonProps = {
    label: string;
    onPress: () => void;
    disabled?: boolean;
};

export default function ActionButton ({label, onPress, disabled = false}: ActionButtonProps) {
    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            accessibilityRole="button"
            className={`h-12 justify-center active:opacity-80 ${disabled ? "opacity-40" : ""}`}
        >
            <View className="absolute inset-0 rotate-1 bg-shade" />
            <View className="absolute inset-0 -rotate-1 bg-primary" />
            <Text className="text-center font-bungee text-sm text-night">{label}</Text>
        </Pressable>
    )
}
