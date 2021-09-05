import React, { useEffect, useState } from "react";

import { PointTooltipProps, ResponsiveLine, Serie } from "@nivo/line";
import moment from "moment";
import { Box, Select } from "@chakra-ui/react";

enum DatePreset {
    LastHour = "LastHour",
    LastDay = "LastDay",
    LastWeek = "LastWeek",
    LastMonth = "LastMonth",
    LastYear = "LastYear",
}

interface DatedSeriesGraphProps {
    name: string;
    defaultPreset?: DatePreset;
    getValues: (minDate: Date, maxDate: Date) => DataPoint[];
}

export const DatedSeriesGraph = ({ name, getValues, defaultPreset = DatePreset.LastDay }: DatedSeriesGraphProps) => {
    const [preset, setPreset] = useState(defaultPreset);
    const [values, setValues] = useState<DataPoint[]>([]);

    useEffect(() => {
        const [minDate, maxDate] = GetDates(preset);
        const newValues = getValues(minDate, maxDate);
        setValues(newValues);
    }, [preset, getValues]);

    const handlePresetChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        debugger;
        setPreset(event.currentTarget.value as DatePreset);
    };

    return (
        <Box>
            <Select value={preset} onChange={handlePresetChange}>
                <option value={DatePreset.LastHour}>Last hour</option>
                <option value={DatePreset.LastDay}>Last Day</option>
                <option value={DatePreset.LastWeek}>Last Week</option>
                <option value={DatePreset.LastMonth}>Last Month</option>
                <option value={DatePreset.LastYear}>Last Year</option>
            </Select>
            {values.length === 0 ? <div>No data</div> : <SeriesGraph name={name} data={values} />}
        </Box>
    );
};

const GetDates = (preset: DatePreset) => {
    var maxDate = new Date();
    var minDate = new Date();

    switch (preset) {
        case DatePreset.LastHour:
            minDate.setHours(minDate.getHours() - 1);
            break;
        case DatePreset.LastDay:
            minDate.setDate(minDate.getDate() - 1);
            break;
        case DatePreset.LastWeek:
            minDate.setDate(minDate.getDate() - 7);
            break;
        case DatePreset.LastMonth:
            minDate.setDate(minDate.getMonth() - 1);
            break;
        case DatePreset.LastYear:
            minDate.setFullYear(minDate.getFullYear() - 1);
            break;
    }

    return [minDate, maxDate];
};

interface SeriesGraphProps {
    name: string;
    data: DataPoint[];
}

interface DataPoint {
    date: Date;
    value: number;
}

const SeriesGraph = ({ name, data }: SeriesGraphProps) => {
    const [series, setSeries] = useState<Serie[]>([]);
    const [minY, setMinY] = useState(0);
    const [maxY, setMaxY] = useState(0);

    useEffect(() => {
        setSeries([
            {
                id: name,
                data: data
                    .sort((r1, r2) => r1.date.getUTCMilliseconds() - r2.date.getUTCMilliseconds())
                    .map((reading) => {
                        return {
                            x: reading.date,
                            y: reading.value,
                        };
                    }),
            },
        ]);

        let yValues = data.map((d) => d.value);
        // let minValue = Math.min(...yValues);
        let maxValue = Math.max(...yValues);
        // setMinY(minValue - getStandardDeviation(yValues));
        setMinY(0);
        setMaxY(maxValue + getStandardDeviation(yValues));
    }, [name, data]);

    const axisBottom = {
        format: "%Y-%m-%d %H:%M",
        tickValues: 5,
    };

    const customTooltip = ({ point }: PointTooltipProps) => {
        return (
            <Box backgroundColor="gray.600" p={2}>
                Time: <b>{point.data.xFormatted}</b>
                <br />
                Value: <b>{point.data.yFormatted}</b>
            </Box>
        );
    };

    return (
        <div style={{ height: 300, background: "white" }}>
            <h3>Nivo Stacked Area Chart</h3>
            <ResponsiveLine
                data={series}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xFormat={(d) => moment(d).format()}
                xScale={{
                    type: "time",
                    precision: "minute",
                    format: "%s",
                }}
                yScale={{
                    type: "linear",
                    min: minY,
                    max: maxY,
                }}
                curve="monotoneX"
                axisBottom={axisBottom}
                axisLeft={{
                    legend: "count",
                    legendOffset: -40,
                    legendPosition: "middle",
                }}
                tooltip={customTooltip}
                colors={{ scheme: "purpleRed_green" }}
                lineWidth={1}
                pointSize={4}
                enableArea={true}
                useMesh={true}
                legends={[
                    {
                        anchor: "bottom-right",
                        direction: "column",
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: "left-to-right",
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 8,
                    },
                ]}
            />
        </div>
    );
};

function getStandardDeviation(array: number[]) {
    const n = array.length;
    const mean = array.reduce((a, b) => a + b) / n;
    return Math.sqrt(array.map((x) => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n);
}
