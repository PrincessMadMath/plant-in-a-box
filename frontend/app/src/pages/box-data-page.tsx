import React, { useEffect, useState } from "react";
import {getGroundHumidity, GroundHumidityData} from "../services/box-data";
import { ResponsiveLine } from '@nivo/line'
import moment from "moment";

export const BoxDataPage = () => {
    const [groundHumidityData, setGroundHumidityData] = useState<GroundHumidityData[]>([]);

    useEffect(() => {
        getGroundHumidity("88b2f49e-1226-4964-9aa9-9b1f8442fd36").then(x => {
            debugger;
            setGroundHumidityData(x);
        });
    }, []);

    return (
        <div>
            <div>Hello</div>
            <div><GroundHumidityGraph values={groundHumidityData}/></div>
        </div>
    )
}

interface GroundHumidityGraphProps{
    values: GroundHumidityData[];
}


const GroundHumidityGraph = ({values}: GroundHumidityGraphProps) => {
    const formattedData = values.map(value => {return {x: moment(value.date).format('YYYY-MM-D-H:m'), y: value.humidity}})
    const data = [{
        id: "ground-humidity",
        color: "hsl(43, 70%, 50%)",
        data: formattedData,
    }];

    return(    
        <div style={{ height: 300 }}>
            <ResponsiveLine
                    data={data}
                    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                    xScale={{
                        type: 'time',
                        format: '%Y-%m-%d-%H:%M',
                    }}
                    xFormat="time:%Y-%m-%d-%H:%M"
                    yScale={{
                        type: 'linear',
                        stacked: false,
                    }}
                    axisLeft={{
                        legend: 'Humidity',
                        legendOffset: 12,
                    }}
                    axisBottom={{
                        format: '%b %d %H:%M',
                        legend: 'time scale',
                        legendOffset: -12,
                        tickValues: 'every 2 months',
                    }}
                    curve="monotoneX"
                    pointSize={16}
                    enablePointLabel={true}
                    useMesh={true}
                />
    </div>
    );

}