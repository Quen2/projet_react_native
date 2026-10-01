import {Image, Pressable, ScrollView, Text, View} from "react-native";
import {router, useLocalSearchParams} from "expo-router";
import {useEffect, useState} from "react";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {Ionicons} from "@expo/vector-icons";
import {MangaType} from "@/enums/type/mangaType";
import {MangaPictureType} from "@/enums/type/mangaPictureType";
import {getManga, getMangaPictures} from "@/api/manga/getMangaList";
import Illustrations from "@/components/Illustrations";
import {useFavorites} from "@/context/FavoritesContext";
import {useTranslation} from "react-i18next";

type Tab = "synopsis" | "background" | "infos";
const {t} = useTranslation();

const TABS: {key: Tab; label: string}[] = [
    {key: "synopsis", label: "Résumé"},
    {key: "background", label: "Contexte"},
    {key: "infos", label: "Infos"},
];

const formatName = (name: string) => name.split(", ").reverse().join(" ");

const formatDate = (iso: string | null) =>
    iso
        ? new Date(iso).toLocaleDateString("fr-FR", {day: "numeric", month: "long", year: "numeric"})
        : "Inconnue";

function InfoRow({label, value}: {label: string; value: string}) {
    return (
        <View className="mb-1.5">
            <Text className="font-inter text-xs leading-[15px] text-ink/70">{label}</Text>
            <Text className="font-inter-semibold text-xs leading-[15px] text-ink">{value}</Text>
        </View>
    );
}

export default function DetailPage() {
    const {id} = useLocalSearchParams<{id: string}>();
    const insets = useSafeAreaInsets();
    const [manga, setManga] = useState<MangaType | null>(null);
    const [pictures, setPictures] = useState<MangaPictureType[]>([]);
    const [activeTab, setActiveTab] = useState<Tab>("synopsis");
    const {isFavorite, toggleFavorite} = useFavorites();

    useEffect(() => {
        if (!id) return;
        getManga(id).then(setManga);
        getMangaPictures(id).then(setPictures);
    }, [id]);

    if (!manga) {
        return <View className="flex-1 bg-background" />;
    }

    const author = manga.authors[0] ? formatName(manga.authors[0].name) : "Inconnu";
    const series = manga.serializations[0]?.name ?? "—";
    const genres = [...manga.genres, ...manga.themes, ...manga.demographics].map((g) => g.name);
    const favorite = isFavorite(manga.mal_id);

    return (
        <View className="flex-1 bg-background" style={{paddingTop: insets.top}}>
            <ScrollView contentContainerStyle={{paddingBottom: 120}}>
                <View className="flex-row items-center px-4 pt-5">
                    <Pressable onPress={() => router.push("/")} hitSlop={10} className="mr-3">
                        <Ionicons name="chevron-back" size={24} color="#141A26" />
                    </Pressable>
                    <Text className="flex-1 font-inter-semibold text-sm leading-[17px] text-ink" numberOfLines={2}>
                        {manga.title}
                    </Text>
                    <Pressable onPress={() => toggleFavorite(manga)} hitSlop={10} className="ml-3">
                        <Ionicons name={favorite ? "star" : "star-outline"} size={24} color="#141A26" />
                    </Pressable>
                </View>

                <View className="mt-6 flex-row items-center gap-4 px-4">
                    <Image
                        source={{uri: manga.images.jpg.large_image_url}}
                        className="aspect-[2/3] w-40 rounded"
                        resizeMode="cover"
                    />

                    <View className="flex-1">
                        <InfoRow label="Auteur" value={author} />
                        <InfoRow label="Magazine" value={series} />
                        <InfoRow label="Type" value={manga.type} />

                        <View className="mb-1.5">
                            <Text className="font-inter text-xs leading-[15px] text-ink/70">{t("buttons.genre")}</Text>
                            <View className="flex-row flex-wrap">
                                {genres.map((genre, index) => (
                                    <Text
                                        key={genre}
                                        className={`font-inter-semibold text-xs leading-[15px] text-ink ${
                                            index > 0 ? "border-l border-outline pl-1.5" : ""
                                        } pr-1.5`}
                                    >
                                        {genre}
                                    </Text>
                                ))}
                            </View>
                        </View>

                        <InfoRow label="Sortie" value={formatDate(manga.published.from)} />

                        <View className="flex-row items-end justify-between">
                            <InfoRow
                                label="Contenu"
                                value={`${manga.chapters ?? "?"} chapitres · ${manga.volumes ?? "?"} vol.`}
                            />
                            <Ionicons name="information-circle-outline" size={16} color="#141A26" style={{marginBottom: 6}} />
                        </View>
                    </View>
                </View>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className="mt-6"
                    contentContainerClassName="px-4 gap-6"
                >
                    {TABS.map((tab) => {
                        const active = activeTab === tab.key;
                        return (
                            <Pressable
                                key={tab.key}
                                onPress={() => setActiveTab(tab.key)}
                                className={`pb-1 ${active ? "border-b border-primary" : ""}`}
                            >
                                <Text className={`font-inter text-sm ${active ? "text-primary" : "text-ink"}`}>
                                    {tab.label}
                                </Text>
                            </Pressable>
                        );
                    })}
                </ScrollView>

                <View className="px-4 pt-4">
                    {activeTab === "synopsis" && (
                        <View>
                            <Text className="font-inter text-xs leading-[15px] text-ink">
                                {manga.synopsis ?? "Aucun résumé disponible."}
                            </Text>
                            <Illustrations pictures={pictures} />
                        </View>
                    )}

                    {activeTab === "background" && (
                        <Text className="font-inter text-xs leading-[15px] text-ink">
                            {manga.background || "Aucune information de contexte."}
                        </Text>
                    )}

                    {activeTab === "infos" && (
                        <View>
                            <InfoRow label="Statut" value={manga.status} />
                            <InfoRow label="Publication" value={manga.published.string} />
                            <InfoRow label="Note" value={manga.score ? `${manga.score} / 10` : "—"} />
                            <InfoRow label="Classement" value={manga.rank ? `#${manga.rank}` : "—"} />
                            <InfoRow label="Membres" value={manga.members.toLocaleString("fr-FR")} />
                        </View>
                    )}
                </View>
            </ScrollView>
        </View>
    );
}