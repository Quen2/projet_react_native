import {Animated, Pressable, Text, View} from "react-native";
import {useRef, useState} from "react";
import {MangaType} from "@/enums/type/mangaType";
import {MangaPictureType} from "@/enums/type/mangaPictureType";
import Illustrations from "@/components/Illustrations";
import {tilt} from "@/theme/palette";

type Tab = "synopsis" | "background" | "infos";

type DetailTabsProps = {
    manga: MangaType;
    pictures: MangaPictureType[];
};

const TABS: {key: Tab; label: string}[] = [
    {key: "synopsis", label: "Résumé"},
    {key: "background", label: "Contexte"},
    {key: "infos", label: "Infos"},
];

const formatDate = (iso: string | null) =>
    iso
        ? new Date(iso).toLocaleDateString("fr-FR", {day: "numeric", month: "long", year: "numeric"})
        : "Inconnue";

function InfoRow({label, value}: {label: string; value: string}) {
    return (
        <View className="mb-3">
            <Text className="font-inter text-xs text-outline">{label}</Text>
            <Text className="font-inter-semibold text-sm text-ink">{value}</Text>
        </View>
    );
}

export default function DetailTabs ({manga, pictures}: DetailTabsProps) {
    const [activeTab, setActiveTab] = useState<Tab>("synopsis");
    const reveal = useRef(new Animated.Value(1)).current;

    const openTab = (tab: Tab) => {
        if (tab === activeTab) return;

        setActiveTab(tab);
        reveal.setValue(0);
        Animated.timing(reveal, {toValue: 1, duration: 220, useNativeDriver: true}).start();
    }

    const panelStyle = {
        opacity: reveal,
        transform: [{translateY: reveal.interpolate({inputRange: [0, 1], outputRange: [12, 0]})}],
    };

    return (
        <View className="mt-8">
            <View className="flex-row gap-3 px-4">
                {TABS.map((tab) => {
                    const active = activeTab === tab.key;
                    return (
                        <Pressable
                            key={tab.key}
                            onPress={() => openTab(tab.key)}
                            accessibilityRole="tab"
                            accessibilityState={{selected: active}}
                            className={`px-3 py-2 ${active ? "bg-accent" : "bg-deep"}`}
                            style={active ? tilt : undefined}
                        >
                            <Text className={`font-bungee text-xs ${active ? "text-night" : "text-ink"}`}>
                                {tab.label}
                            </Text>
                        </Pressable>
                    );
                })}
            </View>

            <Animated.View style={panelStyle}>
                <View className="mx-4 mt-4 bg-surface p-4">
                    {activeTab === "synopsis" && (
                        <View>
                            <Text className="font-inter text-sm leading-6 text-ink">
                                {manga.synopsis ?? "Aucun résumé disponible."}
                            </Text>
                            <Illustrations pictures={pictures} />
                        </View>
                    )}

                    {activeTab === "background" && (
                        <Text className="font-inter text-sm leading-6 text-ink">
                            {manga.background || "Aucune information de contexte."}
                        </Text>
                    )}

                    {activeTab === "infos" && (
                        <View>
                            <InfoRow label="Magazine" value={manga.serializations[0]?.name ?? "—"} />
                            <InfoRow label="Sortie" value={formatDate(manga.published.from)} />
                            <InfoRow label="Publication" value={manga.published.string} />
                            <InfoRow label="Statut" value={manga.status} />
                            <InfoRow
                                label="Contenu"
                                value={`${manga.chapters ?? "?"} chapitres, ${manga.volumes ?? "?"} volumes`}
                            />
                            <InfoRow label="Membres" value={manga.members.toLocaleString("fr-FR")} />
                        </View>
                    )}
                </View>
            </Animated.View>
        </View>
    )
}
