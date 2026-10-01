import {Animated, Image, Pressable, Text, View} from "react-native";
import {router} from "expo-router";
import {MangaType} from "@/enums/type/mangaType";
import {usePressScale} from "@/hooks/usePressScale";
import StickIn from "@/components/StickIn";

type MangaCardProps = {
    manga: MangaType;
    order?: number;
};

export default function MangaCard ({manga, order = 0}: MangaCardProps) {
    const {scale, pressIn, pressOut} = usePressScale();

    const openDetail = () => {
        router.push({pathname: "/manga/[id]", params: {id: String(manga.mal_id)}});
    }

    return (
        <StickIn order={order}>
            <Pressable onPress={openDetail} onPressIn={pressIn} onPressOut={pressOut} className="w-32">
                <Animated.View style={{transform: [{scale}]}}>
                    <View className={`border-[3px] border-ink ${manga.mal_id % 2 ? "-rotate-2" : "rotate-1"}`}>
                        <Image
                            source={{uri: manga.images.jpg.large_image_url}}
                            className="h-44 w-full"
                            resizeMode="cover"
                        />
                        <Text className="absolute -left-2 top-3 -rotate-12 bg-accent px-2 py-0.5 font-bungee text-[10px] text-night">
                            {manga.type}
                        </Text>
                    </View>
                    <Text className="mt-3 font-inter-semibold text-xs text-ink" numberOfLines={2}>
                        {manga.title}
                    </Text>
                </Animated.View>
            </Pressable>
        </StickIn>
    )
}
