import {Text, View} from "react-native";
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "@/components/Button";
import ActionButton from "@/components/ActionButton";
import {types} from "@/enums/type/TypeEnum";
import {categories} from "@/enums/category/CategoryEnum";
import {Filters} from "@/enums/type/filtersType";
import {useTranslation} from "react-i18next";

const FILTERS_KEY = "filters";

export default function EditFiltersForm() {
    const [categoriesFilters, setCategoriesFilters] = useState<number[]>([]);
    const [typeFilter, setTypeFilter] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const {t} = useTranslation();

    useEffect(() => {
        AsyncStorage.getItem(FILTERS_KEY).then((stored) => {
            if (!stored) return;
            const filters: Filters = JSON.parse(stored);
            setCategoriesFilters(filters.categories);
            setTypeFilter(filters.type);
        });
    }, []);

    const toggleCategory = (id: number) => {
        setMessage(null);
        setCategoriesFilters((prev) =>
            prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
        );
    };

    const toggleType = (label: string) => {
        setMessage(null);
        setTypeFilter((prev) => (prev === label ? null : label));
    };

    const handleSubmit = async () => {
        const filters: Filters = {categories: categoriesFilters, type: typeFilter};
        await AsyncStorage.setItem(FILTERS_KEY, JSON.stringify(filters));
        setMessage("Filtres mis à jour");
    };

    return (
        <View>
            <Text className="mt-10 font-bungee text-base text-ink">{t("preferences.title")}</Text>

            <Text className="mt-4 font-inter-semibold text-sm text-ink">{t("preferences.type")}</Text>
            <View className="mt-3 flex-row flex-wrap gap-3">
                {types.map((item) => (
                    <Button
                        key={item.id}
                        label={item.label}
                        selected={typeFilter === item.label}
                        onPress={() => toggleType(item.label)}
                    />
                ))}
            </View>

            <Text className="mt-4 font-inter-semibold text-sm text-ink">{t("preferences.categories")}</Text>
            <View className="mt-3 flex-row flex-wrap gap-3">
                {categories.map((item) => (
                    <Button
                        key={item.id}
                        label={item.label}
                        selected={categoriesFilters.includes(item.id)}
                        onPress={() => toggleCategory(item.id)}
                    />
                ))}
            </View>

            {message ? (
                <Text className="mt-3 self-start bg-accent px-2 py-1 font-inter-semibold text-xs text-night">{message}</Text>
            ) : null}

            <View className="mt-6">
                <ActionButton label="Enregistrer mes filtres" onPress={handleSubmit} />
            </View>
        </View>
    );
}