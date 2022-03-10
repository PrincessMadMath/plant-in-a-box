import { getJson, postJson } from "../utils";
import {
    CreatePlantCommand,
    DeletePlantCommand,
    FertilizePlantCommand,
    RepotPlantCommand,
    WaterPlantCommand,
} from "./commands";
import { Plant } from "./models";

export const getPlants = (): Promise<Plant[]> => {
    return getJson<Plant[]>(`plants`);
};

export const getPlant = (plantId: string): Promise<Plant[]> => {
    return getJson<Plant[]>(`plants/${plantId}`);
};

export const createPlant = (createPlant: CreatePlantCommand): Promise<any> => {
    return postJson(`plants/create`, createPlant);
};

export const deletePlant = (command: DeletePlantCommand): Promise<any> => {
    return postJson(`plants/delete`, command);
};

export const waterPlant = (command: WaterPlantCommand): Promise<any> => {
    return postJson(`plants/water`, command);
};

export const fertilizePlant = (command: FertilizePlantCommand): Promise<any> => {
    return postJson(`plants/fertilize`, command);
};

export const repotPlant = (command: RepotPlantCommand): Promise<any> => {
    return postJson(`plants/repot`, command);
};
