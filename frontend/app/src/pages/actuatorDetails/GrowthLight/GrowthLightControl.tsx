import React, { useEffect, useState } from "react";

import { Box, Center, FormControl, FormLabel, Grid, Radio, RadioGroup, Spinner, Switch, Text } from "@chakra-ui/react";
import { Actuator, ActuatorMode } from "shared/api/actuators";
import { DatePicker } from "shared/components/datePicker/datePicker";
import { dateToTimeOnly, durationBetween, timeOnlyToDate } from "shared/utils";
import dayjs from "dayjs";
import {
    invalidateGrowthLightConfig,
    useGetGrowthLightConfig,
    useSetGrowthLightAutoSettings,
    useSetGrowthLightManualSettings,
    useSetGrowthLightMode,
} from "pages/actuatorDetails/GrowthLight/hooks";
import { useQueryClient } from "react-query";
import { printDuration } from "shared/utils/duration";

interface GrowthLightControlProps {
    actuator: Actuator;
}

export const GrowthLightControl = ({ actuator }: GrowthLightControlProps) => {
    const queryClient = useQueryClient();

    const growthLightConfigQuery = useGetGrowthLightConfig(actuator.id);

    const actuatorModeMutation = useSetGrowthLightMode({
        onSuccess: () => {
            invalidateGrowthLightConfig(queryClient, actuator.id);
        },
    });

    const actuatorManualSettingsMutation = useSetGrowthLightManualSettings({
        onSuccess: () => {
            invalidateGrowthLightConfig(queryClient, actuator.id);
        },
    });

    const actuatorAutomaticSettingsMutation = useSetGrowthLightAutoSettings({
        onSuccess: () => {
            invalidateGrowthLightConfig(queryClient, actuator.id);
        },
    });

    const handleConfigModeChange = (mode: ActuatorMode) => {
        actuatorModeMutation.mutate({ actuatorId: actuator.id, data: { mode: mode } });
    };

    // TODO: To form? (probably since we want confirmation + validation)
    // TODO: Make less awfull
    const handleManualSettingsChange = (isOn: boolean) => {
        actuatorManualSettingsMutation.mutate({ actuatorId: actuator.id, data: { isOn: isOn } });
    };

    const handleAutoSettingsSunriseChange = (newSunRise: Date) => {
        actuatorAutomaticSettingsMutation.mutate({
            actuatorId: actuator.id,
            data: {
                sunriseTime: printDuration(dateToTimeOnly(newSunRise)),
                sunsetTime: growthLightConfigQuery.data!.automaticSettings.sunsetTime,
            },
        });
    };

    const handleAutoSettingsSunsetChange = (newSunset: Date) => {
        actuatorAutomaticSettingsMutation.mutate({
            actuatorId: actuator.id,
            data: {
                sunriseTime: growthLightConfigQuery.data!.automaticSettings.sunriseTime,
                sunsetTime: printDuration(dateToTimeOnly(newSunset)),
            },
        });
    };

    if (growthLightConfigQuery.isLoading) {
        return (
            <Box>
                <Center>
                    <Spinner />
                </Center>
            </Box>
        );
    }

    if (!growthLightConfigQuery.isSuccess) {
        return (
            <Box>
                <Center>
                    <Text>Error</Text>
                </Center>
            </Box>
        );
    }

    const config = growthLightConfigQuery.data;

    const sunriseDate = timeOnlyToDate(config.automaticSettings.sunriseTime);
    const sunsetDate = timeOnlyToDate(config.automaticSettings.sunsetTime);

    return (
        <Box>
            <RadioGroup value={config.mode} onChange={handleConfigModeChange}>
                <Radio value={ActuatorMode.Manual} size="lg">
                    Manual
                </Radio>
                <Box ml={10} mt={3}>
                    <FormControl display="flex" alignItems="center">
                        <FormLabel htmlFor="light" mb="0">
                            Light
                        </FormLabel>
                        <Switch
                            id="light"
                            isChecked={config.manualSettings.isOn}
                            onChange={(x) => handleManualSettingsChange(x.target.checked)}
                        />
                    </FormControl>
                </Box>
                <Radio value={ActuatorMode.Automatic} size="lg" mt={6}>
                    Automatic ({durationBetween(sunriseDate.toString(), sunsetDate.toString())} of sunshine)
                </Radio>
                <Box ml={10} mt={3}>
                    <Grid templateColumns="max-content 1fr" gap={2} justifyItems="left" alignItems="center">
                        <FormLabel htmlFor="rise" mb="0">
                            Rise
                        </FormLabel>
                        <DatePicker
                            selected={sunriseDate}
                            onChange={(date) => handleAutoSettingsSunriseChange(date as Date)}
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
                            selected={sunsetDate}
                            onChange={(date) => handleAutoSettingsSunsetChange(date as Date)}
                            minTime={sunriseDate}
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
