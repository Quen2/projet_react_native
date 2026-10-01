import {View, ScrollView, Text} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {useState} from "react";
import {types} from "@/enums/type/TypeEnum";
import {categories} from "@/enums/category/CategoryEnum";
import Button from "@/components/Button";
import Logo from "@/components/Logo";
import Halftone from "@/components/Halftone";
import ActionButton from "@/components/ActionButton";
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
            <View className="bg-deep" style={{height: insets.top}} />
            <Halftone />
            <ScrollView contentContainerClassName="w-full max-w-md self-center px-6 pt-[76px] pb-6">
                <Logo />
                <Text className="mt-10 font-bungee text-2xl leading-8 text-ink">
                    {t("buttons.title")}
                </Text>
                <Text className="mt-2 font-inter text-sm leading-5 text-ink">
                    {t("buttons.select")}{" "}
                    <Text className="font-inter-semibold text-accent">{t("buttons.type")}</Text>
                    {" "} {t("buttons.reco")}
                </Text>
                <View className="mt-4 flex-row flex-wrap gap-3">
                    {types.map((item) => (
                        <Button
                            key={item.id}
                            label={item.label}
                            selected={typeFilter === item.label}
                            onPress={() => toggleType(item.label)}
                        />
                    ))}
                </View>

                <Text className="mt-6 font-inter text-sm leading-5 text-ink">
                    {t("buttons.select")}{" "}
                    <Text className="font-inter-semibold text-accent">{t("buttons.genre")}</Text>
                    {" "} {t("buttons.reco")}
                </Text>
                <View className="mt-4 flex-row flex-wrap gap-3">
                    {categories.map((item) => (
                        <Button
                            key={item.id}
                            label={item.label}
                            selected={categoriesFilters.includes(item.id)}
                            onPress={() => toggleCategory(item.id)}
                        />
                    ))}
                </View>

                <View className="mt-8">
                    <ActionButton label="Terminer" onPress={handleFilters} />
                </View>
            </ScrollView>
        </View>
    );
}
