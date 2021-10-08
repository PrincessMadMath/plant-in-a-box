// From moment.js: https://github.com/moment/moment/blob/develop/src/lib/duration/create.js

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import duration, { Duration } from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.extend(duration);

const aspNetRegex = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/;

enum TimespanUnitGroup {
    DATE = 2,
    HOUR = 3,
    MINUTE = 4,
    SECOND = 5,
    MILLISECOND = 6,
}

// TODO: Move to ISO 8601?

// From Asp Net format
export const parseDuration = (time: string) => {
    const match = aspNetRegex.exec(time);
    if (match === null) {
        throw new Error("Unsupported duration format. Expecting asp.net format.");
    }

    const sign = match[1] === "-" ? -1 : 1;

    const duration = dayjs.duration({
        years: 0,
        days: toInt(match[TimespanUnitGroup.DATE]) * sign,
        hours: toInt(match[TimespanUnitGroup.HOUR]) * sign,
        minutes: toInt(match[TimespanUnitGroup.MINUTE]) * sign,
        seconds: toInt(match[TimespanUnitGroup.SECOND]) * sign,
        milliseconds: absRound(toInt(match[TimespanUnitGroup.MILLISECOND]) * 1000) * sign, // the millisecond decimal point is included in the match
    });

    return duration;
};

// To Asp Net Format
export const printDuration = (duration: Duration) => {
    return `${Math.floor(
        duration.asDays()
    )}.${duration.hours()}:${duration.minutes()}:${duration.seconds()}.${duration.milliseconds()}`;
};

function toInt(argumentForCoercion: string) {
    const coercedNumber = +argumentForCoercion;
    let value = 0;

    if (coercedNumber !== 0 && isFinite(coercedNumber)) {
        value = absFloor(coercedNumber);
    }

    return value;
}

function absFloor(number: number) {
    if (number < 0) {
        // -0 -> 0
        return Math.ceil(number) || 0;
    } else {
        return Math.floor(number);
    }
}

function absRound(number: number) {
    if (number < 0) {
        return Math.round(-1 * number) * -1;
    } else {
        return Math.round(number);
    }
}
