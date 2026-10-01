import {Animated} from "react-native";
import {ReactNode} from "react";
import {useEntrance} from "@/hooks/useEntrance";

type StickInProps = {
    children: ReactNode;
    order?: number;
};

export default function StickIn ({children, order = 0}: StickInProps) {
    const progress = useEntrance(order);

    const style = {
        opacity: progress,
        transform: [
            {translateY: progress.interpolate({inputRange: [0, 1], outputRange: [24, 0]})},
            {rotate: progress.interpolate({inputRange: [0, 1], outputRange: ["-3deg", "0deg"]})},
        ],
    };

    return <Animated.View style={style}>{children}</Animated.View>;
}
