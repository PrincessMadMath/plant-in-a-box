import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import { parseDuration } from "shared/utils/duration";

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

export const timeOnlyToDate = (time: string) => {
    const duration = parseDuration(time);
    const date = dayjs().hour(duration.hours()).minute(duration.minutes());

    return date.toDate();
};

export const dateToTimeOnly = (date: Date) => {
    const duration = dayjs.duration({
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds(),
        milliseconds: date.getMilliseconds(),
    });

    return duration;
};
