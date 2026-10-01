import {Text, View} from "react-native";
import {useFavorites} from "@/context/FavoritesContext";
import MangaCard from "@/components/MangaCard";

export default function FavoritesList() {
    const {favorites} = useFavorites();

    return (
        <View className="mt-6">
            <Text className="font-inter-semibold text-sm text-ink">Ma liste</Text>

            {favorites.length === 0 ? (
                <Text className="mt-2 font-inter text-xs text-ink/70">
                    Aucun manga dans ta liste pour le moment.
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
