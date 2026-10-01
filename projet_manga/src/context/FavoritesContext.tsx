import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MangaType} from "@/enums/type/mangaType";
import {FavoritesContextType} from "@/type/favorites/favoritesContextType";

const FAVORITES_KEY = 'favorites';

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
    const [favorites, setFavorites] = useState<MangaType[]>([]);

    useEffect(() => {
        loadStoredFavorites();
    }, []);

    const loadStoredFavorites = async () => {
        const stored = await AsyncStorage.getItem(FAVORITES_KEY);
        if (stored) setFavorites(JSON.parse(stored));
    };

    const isFavorite = (id: number) => favorites.some((favorite) => favorite.mal_id === id);

    const toggleFavorite = async (manga: MangaType) => {
        const updated = isFavorite(manga.mal_id)
            ? favorites.filter((favorite) => favorite.mal_id !== manga.mal_id)
            : [...favorites, manga];

        await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
        setFavorites(updated);
    };

    return (
        <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) throw new Error('useFavorites must be used inside FavoritesProvider');
    return context;
};
