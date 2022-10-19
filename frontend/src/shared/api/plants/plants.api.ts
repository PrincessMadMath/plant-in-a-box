import { config } from "shared/config/config";
import { getJsonAxios, postFileAxios, postJsonAxios } from "../utils";
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

export const getPlants = (): Promise<Plant[]> => {
    return getJsonAxios<Plant[]>(`plants`);
};

export const getPlant = (plantId: string): Promise<Plant> => {
    return getJsonAxios<Plant>(`plants/${plantId}`);
};

export const createPlant = (createPlant: CreatePlantCommand): Promise<Plant> => {
    return postJsonAxios(`plants/create`, createPlant);
};

export const updatePlant = (createPlant: UpdatePlantCommand): Promise<Plant> => {
    return postJsonAxios(`plants/update`, createPlant);
};

export const uploadPlantImage = (uploadImage: UploadImageCommand): Promise<UploadImageResult> => {
    return postFileAxios(`plants/${uploadImage.plantId}/image`, uploadImage.file);
};

export const getPlantImage = (plantId: string, etag: string): Promise<string> => {
    return getJsonAxios<string>(`${config.api.url}/plants/${plantId}/imageUrl?etag=${etag}`);
};

export const deletePlant = (command: DeletePlantCommand): Promise<any> => {
    return postJsonAxios(`plants/delete`, command);
};

export const waterPlant = (command: WaterPlantCommand): Promise<any> => {
    return postJsonAxios(`plants/water`, command);
};

export const fertilizePlant = (command: FertilizePlantCommand): Promise<any> => {
    return postJsonAxios(`plants/fertilize`, command);
};

export const repotPlant = (command: RepotPlantCommand): Promise<any> => {
    return postJsonAxios(`plants/repot`, command);
};

export const linkWithSoilMoistureSensor = (command: LinkSensorCommand): Promise<any> => {
    return postJsonAxios(`plants/linkSoilMoistureSensor`, command);
};
