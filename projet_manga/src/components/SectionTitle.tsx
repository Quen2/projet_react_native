import {Animated, Text} from "react-native";
import {useEntrance} from "@/hooks/useEntrance";

type SectionTitleProps = {
    title: string;
    large?: boolean;
};

export default function SectionTitle ({title, large = false}: SectionTitleProps) {
    const progress = useEntrance(0, true);
    const size = large ? "text-4xl leading-[44px]" : "text-xl leading-7";

    const style = {
        alignSelf: "flex-start" as const,
        opacity: progress.interpolate({inputRange: [0, 0.4], outputRange: [0, 1], extrapolate: "clamp"}),
        transform: [
            {scale: progress.interpolate({inputRange: [0, 1], outputRange: [1.5, 1]})},
            {rotate: progress.interpolate({inputRange: [0, 1], outputRange: ["-7deg", "0deg"]})},
        ],
    };

    return (
        <Animated.View style={style}>
            <Text
                aria-hidden
                className={`absolute -right-[3px] left-[3px] top-[3px] font-bungee text-shade ${size}`}
            >
                {title}
            </Text>
            <Text className={`font-bungee text-ink ${size}`}>{title}</Text>
        </Animated.View>
    )
}
