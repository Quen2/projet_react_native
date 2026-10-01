import {Pressable, Text, View} from "react-native";
import {useState} from "react";
import {Ionicons} from "@expo/vector-icons";
import {releaseData} from "@/mock/release/releaseData";
import {addReleaseToCalendar} from "@/api/calendar/addReleaseToCalendar";
import {ReleaseType} from "@/type/release/releaseType";
import {palette} from "@/theme/palette";
import DayMarker from "@/components/DayMarker";
import StickIn from "@/components/StickIn";
import SectionTitle from "@/components/SectionTitle";

const WEEK_DAYS = ["L", "M", "M", "J", "V", "S", "D"];

function toDateKey(year: number, month: number, day: number) {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export default function ReleaseCalendar () {
    const today = new Date();
    const [year, setYear] = useState<number>(today.getFullYear());
    const [month, setMonth] = useState<number>(today.getMonth());
    const [selectedDate, setSelectedDate] = useState<string>(
        toDateKey(today.getFullYear(), today.getMonth(), today.getDate())
    );
    const [message, setMessage] = useState<string>("");

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const offset = (new Date(year, month, 1).getDay() + 6) % 7;
    const days = [...Array(offset).fill(null), ...Array.from({length: daysInMonth}, (_, index) => index + 1)];

    const monthLabel = new Date(year, month).toLocaleDateString("fr-FR", {month: "long", year: "numeric"});
    const selectedReleases = releaseData.filter((release) => release.date === selectedDate);

    const changeMonth = (step: number) => {
        const newDate = new Date(year, month + step);
        setYear(newDate.getFullYear());
        setMonth(newDate.getMonth());
    }

    const selectDate = (dateKey: string) => {
        setSelectedDate(dateKey);
        setMessage("");
    }

    const addToCalendar = async (release: ReleaseType) => {
        try {
            setMessage(await addReleaseToCalendar(release));
        } catch {
            setMessage("Impossible d'ajouter la sortie à l'agenda");
        }
    }

    return (
        <View className="mx-6 mt-4 bg-surface p-4">
            <View className="flex-row items-center justify-between">
                <Pressable onPress={() => changeMonth(-1)} hitSlop={10} className="h-9 w-9 items-center justify-center bg-deep">
                    <Text className="font-bungee text-base text-ink">‹</Text>
                </Pressable>
                <SectionTitle key={monthLabel} title={monthLabel} />
                <Pressable onPress={() => changeMonth(1)} hitSlop={10} className="h-9 w-9 items-center justify-center bg-deep">
                    <Text className="font-bungee text-base text-ink">›</Text>
                </Pressable>
            </View>

            <View className="mt-4 flex-row flex-wrap">
                {WEEK_DAYS.map((weekDay, index) => (
                    <Text key={index} className="w-[14.28%] text-center font-inter-semibold text-xs text-outline">
                        {weekDay}
                    </Text>
                ))}

                {days.map((day, index) => {
                    if (!day) return <View key={`empty-${index}`} className="h-10 w-[14.28%]" />;

                    const dateKey = toDateKey(year, month, day);
                    const selected = dateKey === selectedDate;
                    const hasRelease = releaseData.some((release) => release.date === dateKey);

                    return (
                        <Pressable
                            key={dateKey}
                            onPress={() => selectDate(dateKey)}
                            className="h-10 w-[14.28%] items-center justify-center"
                        >
                            <View className="h-8 w-8 items-center justify-center">
                                {selected ? <DayMarker /> : null}
                                <Text className={`font-inter-semibold text-sm ${selected ? "text-night" : "text-ink"}`}>{day}</Text>
                            </View>
                            {hasRelease && !selected ? <View className="absolute bottom-0 h-1 w-4 bg-ink" /> : null}
                        </Pressable>
                    );
                })}
            </View>

            <View className="mt-4 border-t-[3px] border-deep pt-3">
                <StickIn key={selectedDate}>
                    {selectedReleases.length ? (
                        selectedReleases.map((release) => (
                            <View key={release.title} className="flex-row items-center justify-between py-1">
                                <Text className="flex-1 font-inter text-sm text-ink">
                                    {release.title} <Text className="font-inter-semibold text-accent">Tome {release.volume}</Text>
                                </Text>
                                <Pressable
                                    onPress={() => addToCalendar(release)}
                                    hitSlop={10}
                                    accessibilityRole="button"
                                    accessibilityLabel={`Ajouter ${release.title} à mon agenda`}
                                    className="ml-3 flex-row items-center active:opacity-80"
                                >
                                    <Ionicons name="calendar-outline" size={16} color={palette.ink} />
                                    <Text className="ml-1 font-inter-semibold text-xs text-ink underline">Ajouter à mon agenda</Text>
                                </Pressable>
                            </View>
                        ))
                    ) : (
                        <Text className="font-inter text-sm text-outline">Aucune sortie ce jour</Text>
                    )}
                </StickIn>
                {message ? <Text className="mt-2 font-inter text-xs text-ink">{message}</Text> : null}
            </View>
        </View>
    )
}
