import {Animated, View} from "react-native";
import {useEntrance} from "@/hooks/useEntrance";

export default function Separator () {
    const progress = useEntrance();

    return (
        <View accessible={false} className="mt-10 h-3">
            <Animated.View style={{flex: 1, justifyContent: "center", transform: [{scaleX: progress}]}}>
                <View className="absolute -left-4 -right-4 h-2 rotate-1 bg-shade" />
                <View className="absolute -left-4 -right-4 h-[3px] -rotate-1 bg-ink" />
            </Animated.View>
        </View>
    )
}
