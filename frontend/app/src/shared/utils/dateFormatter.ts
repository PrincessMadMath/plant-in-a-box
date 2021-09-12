import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.extend(duration);

export const formatToReadableDate = (dateStr: string) => {
    const date = dayjs(dateStr);
    return date.local().format("MMM D HH:mm:ss");
};

export const formatFrom = (dateStr: string) => {
    const date = dayjs(dateStr);
    return date.fromNow();
};

export const durationBetween = (dateAstr: string, dateBstr: string) => {
    const dateA = dayjs(dateAstr);
    const dateB = dayjs(dateBstr);
    return dayjs.duration(dateA.diff(dateB)).humanize();
};
