import {Text, View} from "react-native";
import {useFavorites} from "@/context/FavoritesContext";
import MangaCard from "@/components/MangaCard";
import {useTranslation} from "react-i18next";
import SectionTitle from "@/components/SectionTitle";

export default function FavoritesList() {
    const {favorites} = useFavorites();
    const {t} = useTranslation();

    return (
        <View className="mt-10">
            <SectionTitle title="Ma liste" />

            {favorites.length === 0 ? (
                <Text className="mt-3 font-inter text-sm text-outline">
                    {t("favorite.add")}
                </Text>
            ) : (
                <View className="mt-4 flex-row flex-wrap gap-4">
                    {favorites.map((manga, index) => (
                        <MangaCard key={manga.mal_id} manga={manga} order={index} />
                    ))}
                </View>
            )}
        </View>
    );
}
