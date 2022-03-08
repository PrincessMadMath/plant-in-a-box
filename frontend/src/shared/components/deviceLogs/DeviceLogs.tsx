import { Table, Tag, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { orderBy } from "lodash";
import React from "react";
import { LogLevel } from "shared/api/device";
import { formatToReadableDate } from "shared/utils";

interface SensorLogsProps {
    sensorLogs: DeviceLog[];
}

interface DeviceLog {
    date: string;
    level: LogLevel;
    message: string;
}

export const DeviceLogs = ({ sensorLogs }: SensorLogsProps) => {
    const orderedLogs = orderBy(sensorLogs, "date", "desc");

    return (
        <Table variant="striped" size="sm">
            <Thead>
                <Tr>
                    <Th width={"10%"}>DATE</Th>
                    <Th width={"10%"}>TYPE</Th>
                    <Th>CONTENT</Th>
                </Tr>
            </Thead>
            <Tbody>
                {orderedLogs.map((x) => (
                    <Tr>
                        <Td>{formatToReadableDate(x.date)}</Td>
                        <Td>
                            <LevelTag level={x.level} />
                        </Td>
                        <Td>{x.message}</Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};

interface LevelTagProps {
    level: LogLevel;
}

const LevelTag = ({ level }: LevelTagProps) => {
    switch (level) {
        case LogLevel.Verbose:
            return <Tag colorScheme="gray">Verbose</Tag>;

        case LogLevel.Info:
            return <Tag colorScheme="blue">Info</Tag>;

        case LogLevel.Warning:
            return <Tag colorScheme="yellow">Warning</Tag>;

        case LogLevel.Error:
            return <Tag colorScheme="red">Error</Tag>;
    }
};
