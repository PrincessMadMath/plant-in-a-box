import { QueryClient, useMutation, useQuery, useQueryClient } from "react-query";
import {
    CreatePlantCommand,
    DeletePlantCommand,
    FertilizePlantCommand,
    RepotPlantCommand,
    UpdatePlantCommand, UploadImage,
    WaterPlantCommand,
} from "./commands";
import { Plant } from "./models";
import {
    createPlant,
    deletePlant,
    fertilizePlant,
    getPlant,
    getPlants,
    repotPlant,
    updatePlant, uploadPlantImage,
    waterPlant,
} from "./plants.api";

export function useGetPlants() {
    return useQuery<Plant[], any>("plants", getPlants);
}

export function useGetPlant(plantId: string) {
    return useQuery<Plant[], any>(["plants", plantId], () => getPlant(plantId));
}

export function useCreatePlant() {
    const queryClient = useQueryClient();

    return useMutation<Plant, Error, CreatePlantCommand>((mutation) => createPlant(mutation), {
        onSuccess: async (data, variables, context) => {
            queryClient.invalidateQueries(["plants"]);
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

    return useMutation<void, Error, UploadImage>((mutation) => uploadPlantImage(mutation), {
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
