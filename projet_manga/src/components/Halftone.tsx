import {Image, View} from "react-native";

const TILES = [0, 1, 2];

export default function Halftone () {
    return (
        <View accessible={false} className="absolute inset-x-0 top-0 h-44 flex-row overflow-hidden">
            {TILES.map((tile) => (
                <Image
                    key={tile}
                    source={require("@/assets/images/halftone.png")}
                    className="h-44 w-[384px]"
                />
            ))}
        </View>
    )
}
