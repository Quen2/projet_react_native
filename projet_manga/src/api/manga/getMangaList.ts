import {Filters} from "@/enums/type/filtersType";
import {MangaType} from "@/enums/type/mangaType";

const URL = "https://api.tenrai.org/v1/manga"

export const getMangaList = async (filters: Filters) => {
    const {categories, type} = filters;

    const params = new URLSearchParams();
    if (type) params.set("type", type);
    if (categories.length) params.set("genres", categories.join(","));

    try {
        const response = await fetch(`${URL}?${params}`);

        if (!response.ok) {
            throw new Error(`Erreur ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const getManga = async (id: string | string[]): Promise<MangaType | null> => {
    const params = new URLSearchParams();

    try {
        const response = await fetch (`${URL}/${id}`);

        const json = await response.json();
        return json.data
    } catch (error) {
        console.log(error)
        return null
    }
}