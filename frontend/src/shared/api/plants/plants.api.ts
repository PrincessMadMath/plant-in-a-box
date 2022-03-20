import { config } from "shared/config/config";
import { getJson, postFile, postJson } from "../utils";
import {
    CreatePlantCommand,
    DeletePlantCommand,
    FertilizePlantCommand,
    RepotPlantCommand,
    UpdatePlantCommand,
    UploadImageCommand,
    UploadImageResult,
    WaterPlantCommand,
} from "./commands";
import { Plant } from "./models";

export const getPlants = (): Promise<Plant[]> => {
    return getJson<Plant[]>(`plants`);
};

export const getPlant = (plantId: string): Promise<Plant[]> => {
    return getJson<Plant[]>(`plants/${plantId}`);
};

export const createPlant = (createPlant: CreatePlantCommand): Promise<Plant> => {
    return postJson(`plants/create`, createPlant);
};

export const updatePlant = (createPlant: UpdatePlantCommand): Promise<Plant> => {
    return postJson(`plants/update`, createPlant);
};

export const uploadPlantImage = (uploadImage: UploadImageCommand): Promise<UploadImageResult> => {
    return postFile(`plants/${uploadImage.plantId}/image`, uploadImage.file);
};

export const getPlantImage = (plantId: string, etag: string): string => {
    return `${config.api.url}/plants/${plantId}/imageUrl?etag=${etag}`;
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
