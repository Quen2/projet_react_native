import {Text, View} from "react-native";
import {useFavorites} from "@/context/FavoritesContext";
import MangaCard from "@/components/MangaCard";
import SectionTitle from "@/components/SectionTitle";

export default function FavoritesList() {
    const {favorites} = useFavorites();

    return (
        <View className="mt-10">
            <SectionTitle title="Ma liste" />

            {favorites.length === 0 ? (
                <Text className="mt-3 font-inter text-sm text-outline">
                    Ta liste est vide. Touche l'étoile sur une fiche manga pour l'ajouter ici.
                </Text>
            ) : (
                <View className="mt-4 flex-row flex-wrap gap-4">
                    {favorites.map((manga) => (
                        <MangaCard key={manga.mal_id} manga={manga} />
                    ))}
                </View>
            )}
        </View>
    );
}
