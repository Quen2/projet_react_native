import {Animated, ScrollView, Text, View} from "react-native";
import {useLocalSearchParams} from "expo-router";
import {useEffect, useRef, useState} from "react";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {useReducedMotion} from "react-native-reanimated";
import {MangaType} from "@/enums/type/mangaType";
import {MangaPictureType} from "@/enums/type/mangaPictureType";
import {getManga, getMangaPictures} from "@/api/manga/getMangaList";
import {useFavorites} from "@/context/FavoritesContext";
import Halftone from "@/components/Halftone";
import SectionTitle from "@/components/SectionTitle";
import DetailHero from "@/components/DetailHero";
import DetailStats from "@/components/DetailStats";
import DetailTabs from "@/components/DetailTabs";

const formatName = (name: string) => name.split(", ").reverse().join(" ");

export default function DetailPage() {
    const {id} = useLocalSearchParams<{id: string}>();
    const insets = useSafeAreaInsets();
    const [manga, setManga] = useState<MangaType | null>(null);
    const [pictures, setPictures] = useState<MangaPictureType[]>([]);
    const {isFavorite, toggleFavorite} = useFavorites();
    const entrance = useRef(new Animated.Value(0)).current;
    const reducedMotion = useReducedMotion();

    useEffect(() => {
        if (!id) return;
        getManga(id).then(setManga);
        getMangaPictures(id).then(setPictures);
    }, [id]);

    useEffect(() => {
        if (!manga) return;

        if (reducedMotion) {
            entrance.setValue(1);
            return;
        }

        Animated.spring(entrance, {toValue: 1, friction: 6, tension: 60, useNativeDriver: true}).start();
    }, [manga]);

    if (!manga) {
        return <View className="flex-1 bg-background" />;
    }

    const author = manga.authors[0] ? formatName(manga.authors[0].name) : "Auteur inconnu";
    const genres = [...manga.genres, ...manga.themes, ...manga.demographics].map((genre) => genre.name);

    const bodyStyle = {
        opacity: entrance.interpolate({inputRange: [0.5, 1], outputRange: [0, 1], extrapolate: "clamp"}),
        transform: [
            {translateY: entrance.interpolate({inputRange: [0.5, 1], outputRange: [30, 0], extrapolate: "clamp"})},
        ],
    };

    return (
        <View className="flex-1 bg-background" style={{paddingTop: insets.top}}>
            <Halftone />
            <ScrollView contentContainerStyle={{paddingBottom: 120}}>
                <DetailHero
                    manga={manga}
                    entrance={entrance}
                    favorite={isFavorite(manga.mal_id)}
                    onToggleFavorite={() => toggleFavorite(manga)}
                />

                <Animated.View style={bodyStyle}>
                    <View className="mt-4 px-4">
                        <SectionTitle title={manga.title} large />
                        <View className="mt-2 flex-row items-center gap-3">
                            <Text className="font-inter-semibold text-base text-ink">{author}</Text>
                            <Text className="bg-accent px-2 py-0.5 font-bungee text-[10px] text-night">
                                {manga.type}
                            </Text>
                        </View>

                        <View className="mt-4 flex-row flex-wrap gap-2">
                            {genres.map((genre) => (
                                <Text key={genre} className="bg-deep px-2 py-1 font-inter-semibold text-xs text-ink">
                                    {genre}
                                </Text>
                            ))}
                        </View>
                    </View>

                    <DetailStats manga={manga} />
                    <DetailTabs manga={manga} pictures={pictures} />
                </Animated.View>
            </ScrollView>
        </View>
    );
}
