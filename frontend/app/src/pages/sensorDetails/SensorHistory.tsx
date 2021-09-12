import React from "react";

import { TimeSeriesGraph } from "shared/components/graph";
import { SensorData } from "shared/api/sensors";

interface SensorHistoryProps {
    sensorHistory: SensorData[];
}

export const SensorHistory = ({ sensorHistory }: SensorHistoryProps) => {
    return (
        <TimeSeriesGraph
            name="ground-humidity"
            getValues={(minDate, maxDate) => {
                return sensorHistory!
                    .map((d) => ({
                        date: new Date(d.date),
                        value: d.value,
                    }))
                    .filter((x) => x.date >= minDate && x.date <= maxDate);
            }}
        />
    );
};
