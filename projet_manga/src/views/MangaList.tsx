import {ScrollView, View} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {Filters} from "@/enums/type/filtersType";
import MangaSection from "@/components/MangaSection";
import ReleaseCalendar from "@/components/ReleaseCalendar";
import TabBar from "@/components/TabBar";
import Logo from "@/components/Logo";
import Halftone from "@/components/Halftone";
import SectionTitle from "@/components/SectionTitle";

const NO_FILTERS: Filters = {categories: [], type: null};

export default function MangaList(props: {
    filters: Filters;
}) {
    const { filters } = props;
    const insets = useSafeAreaInsets();

    return (
        <View className="flex-1 bg-background">
            <View className="bg-deep" style={{height: insets.top}} />
            <Halftone />
            <ScrollView contentContainerClassName="pb-8">
                <View className="px-6 pt-8">
                    <Logo />
                </View>
                <MangaSection key={JSON.stringify(filters)} title="Nos recommandations" filters={filters} />
                <MangaSection title="Catalogue" filters={NO_FILTERS} />
                <View className="mt-8 px-6">
                    <SectionTitle title="Sorties du mois" />
                </View>
                <ReleaseCalendar />
            </ScrollView>
            <TabBar />
        </View>
    )
}
