import {Animated, Image, Pressable, View} from "react-native";
import {useRef} from "react";
import {router} from "expo-router";
import {Ionicons} from "@expo/vector-icons";
import {MangaType} from "@/enums/type/mangaType";
import {palette, tilt} from "@/theme/palette";

type DetailHeroProps = {
    manga: MangaType;
    entrance: Animated.Value;
    favorite: boolean;
    onToggleFavorite: () => void;
};

export default function DetailHero ({manga, entrance, favorite, onToggleFavorite}: DetailHeroProps) {
    const pop = useRef(new Animated.Value(1)).current;

    const pressFavorite = () => {
        onToggleFavorite();
        Animated.sequence([
            Animated.timing(pop, {toValue: 1.5, duration: 120, useNativeDriver: true}),
            Animated.spring(pop, {toValue: 1, friction: 3, useNativeDriver: true}),
        ]).start();
    }

    const coverStyle = {
        opacity: entrance.interpolate({inputRange: [0, 0.3], outputRange: [0, 1], extrapolate: "clamp"}),
        transform: [
            {scale: entrance.interpolate({inputRange: [0, 1], outputRange: [1.6, 1]})},
            {rotate: entrance.interpolate({inputRange: [0, 1], outputRange: ["-18deg", "-3deg"]})},
        ],
    };

    return (
        <View className="items-center pb-4 pt-5">
            <View className="absolute -left-10 -right-10 top-24 h-52 -rotate-6 bg-deep" />

            <View className="w-full flex-row justify-between px-4">
                <Pressable
                    onPress={() => router.push("/")}
                    hitSlop={10}
                    accessibilityRole="button"
                    accessibilityLabel="Retour"
                    className="h-10 w-10 items-center justify-center bg-deep"
                >
                    <Ionicons name="chevron-back" size={24} color={palette.ink} />
                </Pressable>

                <Animated.View style={{transform: [{scale: pop}]}}>
                    <Pressable
                        onPress={pressFavorite}
                        hitSlop={10}
                        accessibilityRole="button"
                        accessibilityLabel={favorite ? "Retirer de ma liste" : "Ajouter à ma liste"}
                        className={`h-10 w-10 items-center justify-center ${favorite ? "bg-accent" : "bg-deep"}`}
                        style={favorite ? tilt : undefined}
                    >
                        <Ionicons
                            name={favorite ? "star" : "star-outline"}
                            size={24}
                            color={favorite ? palette.night : palette.ink}
                        />
                    </Pressable>
                </Animated.View>
            </View>

            <Animated.View style={coverStyle}>
                <View className="mt-2 w-48 border-4 border-ink">
                    <Image
                        source={{uri: manga.images.jpg.large_image_url}}
                        className="aspect-[2/3] w-full"
                        resizeMode="cover"
                    />
                </View>
            </Animated.View>
        </View>
    )
}
