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
            className={`m-1 rounded-full px-4 py-2 ${selected ? "bg-primary" : "bg-white"}`}
        >
            <Text className={selected ? "text-white" : "text-ink"}>
                {capitalizeFirstLetter(label)}
            </Text>
        </Pressable>
    );
}