export interface CreatePlantCommand {
    name: string;
    species: string;
    room: string;
    pot: string;
    acquisitionDate: string;
}

export interface UpdatePlantCommand {
    plantId: string;
    name: string;
    species: string;
    room: string;
    pot: string;
    acquisitionDate: string;
}

export interface UploadImageCommand {
    plantId: string;
    file: File;
}

export interface UploadImageResult {
    etag: string;
}

export interface DeletePlantCommand {
    plantId: string;
}

export interface WaterPlantCommand {
    plantId: string;
}

export interface FertilizePlantCommand {
    plantId: string;
}

export interface RepotPlantCommand {
    plantId: string;
    pot: string;
}

export interface LinkSensorCommand {
    plantId: string;
    sensorId: string;
}
