import * as Calendar from "expo-calendar/legacy";
import {ReleaseType} from "@/type/release/releaseType";

export async function addReleaseToCalendar(release: ReleaseType) {
    const permission = await Calendar.requestCalendarPermissionsAsync();
    if (!permission.granted) return "Accès à l'agenda refusé";

    const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
    const writableCalendar = calendars.find((calendar) => calendar.allowsModifications);
    if (!writableCalendar) return "Aucun agenda disponible sur ce téléphone";

    await Calendar.createEventAsync(writableCalendar.id, {
        title: `${release.title} - Tome ${release.volume}`,
        startDate: new Date(release.date),
        endDate: new Date(release.date),
        allDay: true,
    });

    return `${release.title} ajouté à votre agenda`;
}
