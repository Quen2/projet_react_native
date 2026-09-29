import {Pressable, Text, View} from "react-native";
import {useEffect} from "react";
import {getMangaList} from "@/api/manga/getMangaList";
import {Filters} from "@/enums/type/filtersType";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

    const wipeAsync = async () => {
        AsyncStorage.clear()
    }

    return (
        <View>
            <Text>Je suis la page manga</Text>
            <Pressable onPress={wipeAsync}>
                <Text>
                    Wipe
                </Text>
            </Pressable>
        </View>
    )
}