import {Pressable, Text} from "react-native";

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
            className={`items-center justify-center rounded-xl border border-primary px-2 py-1 ${selected ? "bg-primary" : ""}`}
        >
            <Text className={`font-inter text-xs leading-[15px] ${selected ? "text-white" : "text-primary"}`}>
                {capitalizeFirstLetter(label)}
            </Text>
        </Pressable>
    );
}
