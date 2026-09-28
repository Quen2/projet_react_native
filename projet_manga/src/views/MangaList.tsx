import {View} from "react-native";
import {useEffect} from "react";
import {getMangaList} from "@/api/manga/getMangaList";
import {Filters} from "@/enums/type/filtersType";

export default function MangaList(props: {
    filters: Filters;
}) {
    const { filters } = props;

    useEffect(() => {
        const loadManga = async () => {
            const data = await getMangaList(filters);
        }
        loadManga()
    }, []);

    return (
        <View>

        </View>
    )
}