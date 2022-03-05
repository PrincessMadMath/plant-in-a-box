import { useQuery } from "react-query";
import { Plant } from "./models";
import { getPlant, getPlants } from "./plants.api";

export function useGetPlants() {
    return useQuery<Plant[], any>("plants", getPlants);
}

export function useGetPlant(plantId: string) {
    return useQuery<Plant[], any>(["plants", plantId], () => getPlant(plantId));
}
