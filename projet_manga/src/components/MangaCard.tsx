import {Image, Pressable, Text, View} from "react-native";
import {router} from "expo-router";
import {MangaType} from "@/enums/type/mangaType";

type MangaCardProps = {
    manga: MangaType;
};

export default function MangaCard ({manga}: MangaCardProps) {
    const openDetail = () => {
        router.push({pathname: "/manga/[id]", params: {id: String(manga.mal_id)}});
    }

    return (
        <Pressable onPress={openDetail} className="w-32">
            <View>
                <Image
                    source={{uri: manga.images.jpg.large_image_url}}
                    className="h-44 w-32 rounded-md"
                    resizeMode="cover"
                />
                <Text className="absolute right-0 top-0 rounded-tr-md bg-primary px-1.5 py-0.5 font-inter text-xs text-white">
                    {manga.type}
                </Text>
            </View>
            <Text className="mt-1.5 font-inter-medium text-xs text-ink" numberOfLines={2}>
                {manga.title}
            </Text>
        </Pressable>
    )
}
