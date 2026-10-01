import {Text, View} from "react-native";

type SectionTitleProps = {
    title: string;
    large?: boolean;
};

export default function SectionTitle ({title, large = false}: SectionTitleProps) {
    const size = large ? "text-4xl leading-[44px]" : "text-xl leading-7";

    return (
        <View className="self-start">
            <Text
                aria-hidden
                className={`absolute -right-[3px] left-[3px] top-[3px] font-bungee text-shade ${size}`}
            >
                {title}
            </Text>
            <Text className={`font-bungee text-ink ${size}`}>{title}</Text>
        </View>
    )
}
