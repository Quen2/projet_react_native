import {Image, ScrollView, Text, View} from "react-native";
import {MangaPictureType} from "@/enums/type/mangaPictureType";

type IllustrationsProps = {
    pictures: MangaPictureType[];
};

export default function Illustrations ({pictures}: IllustrationsProps) {
    if (!pictures.length) return null;

    return (
        <View className="mt-4">
            <Text className="font-inter-semibold text-xs text-ink">Illustrations</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="mt-2"
                contentContainerClassName="gap-3"
            >
                {pictures.map((picture) => (
                    <Image
                        key={picture.jpg.image_url}
                        source={{uri: picture.jpg.image_url}}
                        className="aspect-[2/3] w-40 rounded"
                        resizeMode="cover"
                    />
                ))}
            </ScrollView>
        </View>
    )
}
