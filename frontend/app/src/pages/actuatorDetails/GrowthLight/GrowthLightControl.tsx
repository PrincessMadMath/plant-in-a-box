import React, { useState } from "react";

import {
    Box,
    FormControl,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
    Switch,
} from "@chakra-ui/react";
import { Actuator } from "shared/api/actuators";
import { DatePicker } from "shared/components/datePicker/datePicker";
import { durationBetween } from "shared/utils";
import dayjs from "dayjs";

interface GrowthLightControlProps {
    actuator: Actuator;
}

export const GrowthLightControl = ({ actuator }: GrowthLightControlProps) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    return (
        <Box>
            <RadioGroup defaultValue="2">
                <Radio value="1" size="lg">
                    Manual
                </Radio>
                <Box ml={10} mt={3}>
                    <FormControl display="flex" alignItems="center">
                        <FormLabel htmlFor="light" mb="0">
                            Light
                        </FormLabel>
                        <Switch id="light" />
                    </FormControl>
                </Box>
                <Radio value="2" size="lg" mt={6}>
                    Automatic ({durationBetween(startDate.toString(), endDate.toString())} of sunshine)
                </Radio>
                <Box ml={10} mt={3}>
                    <Grid templateColumns="max-content 1fr" gap={2} justifyItems="left" alignItems="center">
                        <FormLabel htmlFor="rise" mb="0">
                            Rise
                        </FormLabel>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date as Date)}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={30}
                            timeCaption="Rise"
                            dateFormat="h:mm aa"
                        />
                        <FormLabel htmlFor="fall" mb="0">
                            Fall
                        </FormLabel>
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date as Date)}
                            minTime={startDate}
                            maxTime={dayjs().endOf("day").toDate()}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={30}
                            timeCaption="Fall"
                            dateFormat="h:mm aa"
                        />
                    </Grid>
                </Box>
            </RadioGroup>
        </Box>
    );
};
