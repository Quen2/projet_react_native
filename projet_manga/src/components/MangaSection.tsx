import {ActivityIndicator, FlatList, Text, View} from "react-native";
import {useEffect, useRef, useState} from "react";
import {getMangaList} from "@/api/manga/getMangaList";
import {Filters} from "@/enums/type/filtersType";
import {MangaType} from "@/enums/type/mangaType";
import MangaCard from "@/components/MangaCard";
import SectionTitle from "@/components/SectionTitle";
import {palette} from "@/theme/palette";

const PAGE_SIZE = 10;

type MangaSectionProps = {
    title: string;
    filters: Filters;
};

export default function MangaSection ({title, filters}: MangaSectionProps) {
    const [mangas, setMangas] = useState<MangaType[]>([]);
    const [page, setPage] = useState<number>(1);
    const [hasNextPage, setHasNextPage] = useState<boolean>(true);
    const loading = useRef<boolean>(false);

    const loadNextPage = async () => {
        if (loading.current || !hasNextPage) return;
        loading.current = true;

        const data = await getMangaList(filters, page);

        if (data) {
            setMangas((previousMangas) => [
                ...previousMangas,
                ...data.data.filter((manga: MangaType) =>
                    !previousMangas.some((previousManga) => previousManga.mal_id === manga.mal_id)
                ),
            ]);
            setHasNextPage(data.pagination.has_next_page);
            setPage(page + 1);
        }

        loading.current = false;
    }

    useEffect(() => {
        loadNextPage();
    }, []);

    return (
        <View className="mt-8">
            <View className="px-6">
                <SectionTitle title={title} />
            </View>
            <FlatList
                data={mangas}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(manga) => String(manga.mal_id)}
                renderItem={({item, index}) => <MangaCard manga={item} order={index % PAGE_SIZE} />}
                onEndReached={loadNextPage}
                onEndReachedThreshold={0.5}
                className="mt-2"
                contentContainerClassName="gap-5 px-6 py-2"
                ListFooterComponent={
                    hasNextPage ? <ActivityIndicator color={palette.ink} className="h-44 px-4" /> : null
                }
                ListEmptyComponent={
                    hasNextPage ? null : <Text className="font-inter text-sm text-ink">Aucun manga trouvé</Text>
                }
            />
        </View>
    )
}
