import {Text, View} from "react-native";
import {useFavorites} from "@/context/FavoritesContext";
import MangaCard from "@/components/MangaCard";
import {useTranslation} from "react-i18next";

export default function FavoritesList() {
    const {favorites} = useFavorites();
    const {t} = useTranslation();

    return (
        <View className="mt-6">
            <Text className="font-inter-semibold text-sm text-ink">{t("favorite.list")}</Text>

            {favorites.length === 0 ? (
                <Text className="mt-2 font-inter text-xs text-ink/70">
                    {t("favorite.none")}
                </Text>
            ) : (
                <View className="mt-2 flex-row flex-wrap gap-4">
                    {favorites.map((manga) => (
                        <MangaCard key={manga.mal_id} manga={manga} />
                    ))}
                </View>
            )}
        </View>
    );
}
