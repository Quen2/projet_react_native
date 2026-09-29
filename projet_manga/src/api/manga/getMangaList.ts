import {Filters} from "@/enums/type/filtersType";
import {MangaType} from "@/enums/type/mangaType";
import {MangaPictureType} from "@/enums/type/mangaPictureType";

const URL = "https://api.tenrai.org/v1/manga"

export const getMangaList = async (filters: Filters, page = 1) => {
    const {categories, type} = filters;

    const params = new URLSearchParams({page: String(page)});
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

export const getMangaPictures = async (id: string): Promise<MangaPictureType[]> => {
    try {
        const response = await fetch(`${URL}/${id}/pictures`);

        const json = await response.json();
        return json.data ?? []
    } catch (error) {
        console.log(error)
        return []
    }
}
