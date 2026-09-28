import {Text, View} from "react-native";
import {Filters} from "@/enums/type/filtersType";
import {useEffect, useState} from "react";
import MangaList from "@/views/MangaList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CategoryButtons from "@/components/CategoryButtons";

export default function Homepage () {
    const [filters, setFilters] = useState<Filters | null>(null);

    useEffect(() => {
        AsyncStorage.getItem("filters")
            .then((stored) => {
                if (stored) setFilters(JSON.parse(stored));
            }).catch((error) => {
            console.log(error)
        })
    }, [])

    const handleSubmit = async (newFilters: Filters) => {
        setFilters(newFilters);
        await AsyncStorage.setItem("filters", JSON.stringify(newFilters));
    }

    return (
        <View className="flex-1">
            {
                filters ? <MangaList filters={filters} />
                    : <CategoryButtons onSubmit={handleSubmit} />
            }
        </View>
    )
}