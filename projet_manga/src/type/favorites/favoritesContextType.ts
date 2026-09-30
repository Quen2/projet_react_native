import {MangaType} from "@/enums/type/mangaType";

export interface FavoritesContextType {
    favorites: MangaType[];
    isFavorite: (id: number) => boolean;
    toggleFavorite: (manga: MangaType) => Promise<void>;
}
