import {View, ScrollView, Text, Pressable} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {useState} from "react";
import {types} from "@/enums/type/TypeEnum";
import {categories} from "@/enums/category/CategoryEnum";
import Button from "@/components/Button";
import { Filters} from "@/enums/type/filtersType";
import {useTranslation} from "react-i18next";

export default function CategoryButtons(props: {
    onSubmit: (filters: Filters) => void;
}) {
    const {onSubmit} = props;
    const [categoriesFilters, setCategoriesFilters] = useState<number[]>([]);
    const [typeFilter, setTypeFilter] = useState<string | null>(null);
    const insets = useSafeAreaInsets();
    const {t} = useTranslation();

    const toggleCategory = (id: number) => {
        setCategoriesFilters((prev) =>
            prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
        );
    };

    const toggleType = (label: string) => {
        setTypeFilter((prev) => (prev === label ? null : label));
    };

    const handleFilters = () => {
        onSubmit({categories: categoriesFilters, type: typeFilter});
    };

    return (
        <View className="flex-1 bg-background">
            <View className="bg-white" style={{height: insets.top}} />
            <ScrollView contentContainerClassName="w-full max-w-md self-center px-6 pt-[76px] pb-6">
                <Text className="font-inter-semibold text-xl leading-6 text-ink">
                    {t("buttons.title")}
                </Text>
                <Text className="mt-2 font-inter-light text-sm leading-[17px] text-ink">
                    {t("buttons.select")}{" "}
                    <Text className="font-inter-semibold text-primary">{t("buttons.type")}</Text>
                    {" "} {t("buttons.reco")}
                </Text>
                <View className="mt-3 flex-row flex-wrap gap-2">
                    {types.map((item) => (
                        <Button
                            key={item.id}
                            label={item.label}
                            selected={typeFilter === item.label}
                            onPress={() => toggleType(item.label)}
                        />
                    ))}
                </View>

                <Text className="mt-4 font-inter-light text-sm leading-[17px] text-ink">
                    {t("buttons.select")}{" "}
                    <Text className="font-inter-semibold text-primary">{t("buttons.genre")}</Text>
                    {" "} {t("buttons.reco")}
                </Text>
                <View className="mt-3 flex-row flex-wrap gap-2">
                    {categories.map((item) => (
                        <Button
                            key={item.id}
                            label={item.label}
                            selected={categoriesFilters.includes(item.id)}
                            onPress={() => toggleCategory(item.id)}
                        />
                    ))}
                </View>

                <Pressable
                    onPress={handleFilters}
                    className="mt-6 h-10 items-center justify-center rounded-lg bg-primary px-4"
                    style={{boxShadow: "0px 2px 8px rgba(24, 28, 20, 0.1)"}}
                >
                    <Text className="font-inter-medium text-base text-white">{t("buttons.submit")}</Text>
                </Pressable>
            </ScrollView>
        </View>
    );
}
