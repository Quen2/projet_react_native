import {Image, ScrollView, View} from "react-native";
import {MangaPictureType} from "@/enums/type/mangaPictureType";
import SectionTitle from "@/components/SectionTitle";

type IllustrationsProps = {
    pictures: MangaPictureType[];
};

export default function Illustrations ({pictures}: IllustrationsProps) {
    if (!pictures.length) return null;

    return (
        <View className="mt-6">
            <SectionTitle title="Illustrations" />
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="mt-4"
                contentContainerClassName="gap-3"
            >
                {pictures.map((picture) => (
                    <Image
                        key={picture.jpg.image_url}
                        source={{uri: picture.jpg.image_url}}
                        className="aspect-[2/3] w-40 border-[3px] border-ink"
                        resizeMode="cover"
                    />
                ))}
            </ScrollView>
        </View>
    )
}
