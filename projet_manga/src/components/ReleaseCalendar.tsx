import {Pressable, Text, View} from "react-native";
import {useState} from "react";
import {releaseData} from "@/mock/release/releaseData";

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

    return (
        <View className="mx-6 mt-6 rounded-lg bg-white p-4">
            <View className="flex-row items-center justify-between">
                <Pressable onPress={() => changeMonth(-1)} hitSlop={10}>
                    <Text className="font-inter-semibold text-base text-primary">‹</Text>
                </Pressable>
                <Text className="font-inter-semibold text-base capitalize text-ink">{monthLabel}</Text>
                <Pressable onPress={() => changeMonth(1)} hitSlop={10}>
                    <Text className="font-inter-semibold text-base text-primary">›</Text>
                </Pressable>
            </View>

            <View className="mt-3 flex-row flex-wrap">
                {WEEK_DAYS.map((weekDay, index) => (
                    <Text key={index} className="w-[14.28%] text-center font-inter-light text-xs text-outline">
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
                            onPress={() => setSelectedDate(dateKey)}
                            className="h-10 w-[14.28%] items-center justify-center"
                        >
                            <View className={`h-8 w-8 items-center justify-center rounded-full ${selected ? "bg-primary" : ""}`}>
                                <Text className={`font-inter text-sm ${selected ? "text-white" : "text-ink"}`}>{day}</Text>
                            </View>
                            {hasRelease && !selected ? <View className="absolute bottom-0.5 h-1 w-1 rounded-full bg-primary" /> : null}
                        </Pressable>
                    );
                })}
            </View>

            <View className="mt-3 border-t-[0.5px] border-outline pt-3">
                {selectedReleases.length ? (
                    selectedReleases.map((release) => (
                        <Text key={release.title} className="font-inter text-sm text-ink">
                            {release.title} <Text className="font-inter-semibold text-primary">Tome {release.volume}</Text>
                        </Text>
                    ))
                ) : (
                    <Text className="font-inter-light text-sm text-ink">Aucune sortie ce jour</Text>
                )}
            </View>
        </View>
    )
}
