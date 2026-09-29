import {ScrollView, View} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {Filters} from "@/enums/type/filtersType";
import MangaSection from "@/components/MangaSection";
import ReleaseCalendar from "@/components/ReleaseCalendar";
import TabBar from "@/components/TabBar";

const NO_FILTERS: Filters = {categories: [], type: null};

export default function MangaList(props: {
    filters: Filters;
}) {
    const { filters } = props;
    const insets = useSafeAreaInsets();

    return (
        <View className="flex-1 bg-background">
            <View className="bg-white" style={{height: insets.top}} />
            <ScrollView contentContainerClassName="pb-6">
                <MangaSection key={JSON.stringify(filters)} title="Nos recommandations" filters={filters} />
                <MangaSection title="Catalogue" filters={NO_FILTERS} />
                <ReleaseCalendar />
            </ScrollView>
            <TabBar />
        </View>
    )
}
