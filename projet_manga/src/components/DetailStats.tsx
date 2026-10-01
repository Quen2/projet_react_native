import {Text, View} from "react-native";
import {MangaType} from "@/enums/type/mangaType";

type DetailStatsProps = {
    manga: MangaType;
};

export default function DetailStats ({manga}: DetailStatsProps) {
    const stats = [
        {label: "Note sur 10", value: manga.score ? String(manga.score) : "—"},
        {label: "Classement", value: manga.rank ? `#${manga.rank}` : "—"},
        {label: "Volumes", value: manga.volumes ? String(manga.volumes) : "?"},
    ];

    return (
        <View className="mt-6 flex-row gap-3 px-4">
            {stats.map((stat) => (
                <View key={stat.label} className="flex-1 bg-deep px-3 py-3">
                    <Text className="font-bungee text-xl text-ink">{stat.value}</Text>
                    <Text className="font-inter text-xs text-outline">{stat.label}</Text>
                </View>
            ))}
        </View>
    )
}
