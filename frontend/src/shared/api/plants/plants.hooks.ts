import { QueryClient, useMutation, useQuery, useQueryClient } from "react-query";
import {
    CreatePlantCommand,
    DeletePlantCommand,
    FertilizePlantCommand,
    RepotPlantCommand,
    WaterPlantCommand,
} from "./commands";
import { Plant } from "./models";
import { createPlant, deletePlant, fertilizePlant, getPlant, getPlants, repotPlant, waterPlant } from "./plants.api";

export function useGetPlants() {
    return useQuery<Plant[], any>("plants", getPlants);
}

export function useGetPlant(plantId: string) {
    return useQuery<Plant[], any>(["plants", plantId], () => getPlant(plantId));
}

export function useCreatePlant() {
    const queryClient = useQueryClient();

    return useMutation<void, Error, CreatePlantCommand>((mutation) => createPlant(mutation), {
        onSuccess: async (data, variables, context) => {
            queryClient.invalidateQueries(["plants"]);
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
            await updatePlantInCache(queryClient, variables.plantId);
        },
    });
}

export function useFertilizePlant() {
    const queryClient = useQueryClient();

    return useMutation<void, Error, FertilizePlantCommand>((mutation) => fertilizePlant(mutation), {
        onSuccess: async (data, variables, context) => {
            await updatePlantInCache(queryClient, variables.plantId);
        },
    });
}

export function useRepotPlant() {
    const queryClient = useQueryClient();

    return useMutation<void, Error, RepotPlantCommand>((mutation) => repotPlant(mutation), {
        onSuccess: async (data, variables, context) => {
            await updatePlantInCache(queryClient, variables.plantId);
        },
    });
}

// TODO: Is it the clean way with react-query?
const updatePlantInCache = async (client: QueryClient, plantId: string) => {
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

const removePlantFromCache = async (client: QueryClient, plantId: string) => {
    client.setQueriesData(["plants"], (previous: any) => {
        return previous.filter((plant: Plant) => {
            return plant.plantId !== plantId;
        });
    });
};
