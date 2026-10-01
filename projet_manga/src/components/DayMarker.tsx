import {Animated, StyleSheet, View} from "react-native";
import {useEntrance} from "@/hooks/useEntrance";

export default function DayMarker () {
    const progress = useEntrance(0, true);

    const style = {
        transform: [
            {scale: progress.interpolate({inputRange: [0, 1], outputRange: [0.3, 1]})},
            {rotate: progress.interpolate({inputRange: [0, 1], outputRange: ["-30deg", "-3deg"]})},
        ],
    };

    return (
        <Animated.View style={[StyleSheet.absoluteFill, style]}>
            <View className="flex-1 bg-accent" />
        </Animated.View>
    )
}
