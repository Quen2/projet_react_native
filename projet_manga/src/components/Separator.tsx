import {View} from "react-native";

export default function Separator () {
    return (
        <View accessible={false} className="mt-10 h-3 justify-center">
            <View className="absolute -left-4 -right-4 h-2 rotate-1 bg-shade" />
            <View className="absolute -left-4 -right-4 h-[3px] -rotate-1 bg-ink" />
        </View>
    )
}
