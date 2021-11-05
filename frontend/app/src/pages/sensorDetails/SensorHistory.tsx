import React from "react";

import { SensorData } from "shared/api/sensors";
import { TimeSeriesGraph } from "shared/components/graph";

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
