import {View, FlatList, Text, Pressable} from "react-native";
import {useState} from "react";
import {types} from "@/enums/type/TypeEnum";
import {categories} from "@/enums/category/CategoryEnum";
import Button from "@/components/Button";
import { Filters} from "@/enums/type/filtersType";

export default function CategoryButtons(props: {
    onSubmit: (filters: Filters) => void;
}) {
    const {onSubmit} = props;
    const [categoriesFilters, setCategoriesFilters] = useState<number[]>([]);
    const [typeFilter, setTypeFilter] = useState<string | null>(null);

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
        <View className="flex-1">
            <Text>Type</Text>
            <FlatList
                data={types}
                keyExtractor={(item) => String(item.id)}
                renderItem={({item}) => (
                    <Button
                        label={item.label}
                        selected={typeFilter === item.label}
                        onPress={() => toggleType(item.label)}
                    />
                )}
            />

            <Text>Catégories</Text>
            <FlatList
                data={categories}
                keyExtractor={(item) => String(item.id)}
                renderItem={({item}) => (
                    <Button
                        label={item.label}
                        selected={categoriesFilters.includes(item.id)}
                        onPress={() => toggleCategory(item.id)}
                    />
                )}
            />

            <Pressable onPress={handleFilters}>
                <Text>Découvrir nos mangas</Text>
            </Pressable>
        </View>
    );
}