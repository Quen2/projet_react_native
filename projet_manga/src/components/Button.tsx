import {Pressable, Text} from "react-native";
import {tilt} from "@/theme/palette";

function capitalizeFirstLetter(label: string) {
    return label.charAt(0).toUpperCase() + label.slice(1);
}

export default function Button(props: {
    label: string;
    selected: boolean;
    onPress: () => void;
}) {
    const {label, selected, onPress} = props;

    return (
        <Pressable
            onPress={onPress}
            className={`items-center justify-center px-3 py-2 ${selected ? "bg-accent" : "bg-deep"}`}
            style={selected ? tilt : undefined}
        >
            <Text className={`font-inter-semibold text-xs ${selected ? "text-night" : "text-ink"}`}>
                {capitalizeFirstLetter(label)}
            </Text>
        </Pressable>
    );
}
