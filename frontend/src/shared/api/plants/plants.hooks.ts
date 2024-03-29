import { useEffect, useState } from "react";
import { QueryClient, useMutation, useQuery, useQueryClient } from "react-query";
import {
    CreatePlantCommand,
    DeletePlantCommand,
    FertilizePlantCommand,
    LinkSensorCommand,
    RepotPlantCommand,
    UpdatePlantCommand,
    UploadImageCommand,
    UploadImageResult,
    WaterPlantCommand,
} from "./commands";
import { Plant } from "./models";
import {
    createPlant,
    deletePlant,
    fertilizePlant,
    getPlant,
    getPlantImage,
    getPlants,
    linkWithSoilMoistureSensor,
    repotPlant,
    updatePlant,
    uploadPlantImage,
    waterPlant,
} from "./plants.api";

export function useGetPlants() {
    return useQuery<Plant[], any>("plants", getPlants);
}

export function useGetPlant(plantId: string) {
    return useQuery<Plant, any>(["plants", plantId], () => getPlant(plantId));
}

export function useGetPlantImageSource(plantId: string, etag: string) {
    return useQuery<string, any>(["plants", plantId, "image"], () => getPlantImage(plantId, etag));
}

// https://devtrium.com/posts/async-functions-useeffect
export function useGetPlantImageSource2(plantId: string, etag: string) {
    const [source, setSource] = useState("");

    console.log(`Use image ${etag}`);

    useEffect(() => {
        let isSubscribed = true;

        console.log(`Is fetching image ${etag}`);
        const fetchData = async () => {
            const imageSource = await getPlantImage(plantId, etag);

            if (isSubscribed) {
                setSource(imageSource);
            }
        };

        fetchData();

        return () => {
            isSubscribed = false;
        };
    }, [plantId, etag]);

    return source;
}

export function useCreatePlant() {
    const queryClient = useQueryClient();

    return useMutation<Plant, Error, CreatePlantCommand>((mutation) => createPlant(mutation), {
        onSuccess: async (data, variables, context) => {
            await queryClient.invalidateQueries(["plants"]);
        },
    });
}

export function useUpdatePlant() {
    const queryClient = useQueryClient();

    return useMutation<Plant, Error, UpdatePlantCommand>((mutation) => updatePlant(mutation), {
        onSuccess: async (data, variables, context) => {
            await updatePlantInCache(queryClient, data);
        },
    });
}

export function useUploadImage() {
    const queryClient = useQueryClient();

    return useMutation<UploadImageResult, Error, UploadImageCommand>((mutation) => uploadPlantImage(mutation), {
        onSuccess: async (data, variables, context) => {
            await refreshPlantInCache(queryClient, variables.plantId);
        },
    });
}

export function useDeletePlant() {
    const queryClient = useQueryClient();

    return useMutation<void, Error, DeletePlantCommand>((mutation) => deletePlant(mutation), {
        onSuccess: async (data, variables, context) => {
            await removePlantFromCache(queryClient, variables.plantId);
        },
    });
}

export function useWaterPlant() {
    const queryClient = useQueryClient();

    return useMutation<void, Error, WaterPlantCommand>((mutation) => waterPlant(mutation), {
        onSuccess: async (data, variables, context) => {
            await refreshPlantInCache(queryClient, variables.plantId);
        },
    });
}

export function useFertilizePlant() {
    const queryClient = useQueryClient();

    return useMutation<void, Error, FertilizePlantCommand>((mutation) => fertilizePlant(mutation), {
        onSuccess: async (data, variables, context) => {
            await refreshPlantInCache(queryClient, variables.plantId);
        },
    });
}

export function useRepotPlant() {
    const queryClient = useQueryClient();

    return useMutation<void, Error, RepotPlantCommand>((mutation) => repotPlant(mutation), {
        onSuccess: async (data, variables, context) => {
            await refreshPlantInCache(queryClient, variables.plantId);
        },
    });
}

const refreshPlantInCache = async (client: QueryClient, plantId: string) => {
    const updatedPlant = await getPlant(plantId);
    client.setQueriesData(["plants"], (previous: any) => {
        return previous.map((plant: Plant) => {
            if (plant.plantId === plantId) {
                return updatedPlant;
            } else {
                return plant;
            }
        });
    });
};

const updatePlantInCache = async (client: QueryClient, updatedPlant: Plant) => {
    client.setQueriesData(["plants"], (previous: any) => {
        return previous.map((plant: Plant) => {
            if (plant.plantId === updatedPlant.plantId) {
                return updatedPlant;
            } else {
                return plant;
            }
        });
    });
};

const removePlantFromCache = async (client: QueryClient, plantId: string) => {
    client.setQueriesData(["plants"], (previous: any) => {
        return previous.filter((plant: Plant) => {
            return plant.plantId !== plantId;
        });
    });
};

export function useLinkWithSoilMoistureSensor() {
    const queryClient = useQueryClient();

    return useMutation<void, Error, LinkSensorCommand>((mutation) => linkWithSoilMoistureSensor(mutation), {
        onSuccess: async (data, variables, context) => {
            await queryClient.invalidateQueries(["plants", variables.plantId]);
        },
    });
}
