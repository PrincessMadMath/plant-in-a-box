import {getJson, postJson} from "../utils";
import {CreatePlantCommand, Plant} from "./models";

export const getPlants = (): Promise<Plant[]> => {
    return getJson<Plant[]>(`plants`);
};

export const getPlant = (plantId: string): Promise<Plant[]> => {
    return getJson<Plant[]>(`plants/${plantId}`);
};

export const createPlant = (createPlant: CreatePlantCommand): Promise<any> => {
    return postJson(`plants/create`, createPlant);
};