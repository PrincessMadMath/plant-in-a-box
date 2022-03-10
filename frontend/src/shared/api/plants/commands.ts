export interface CreatePlantCommand {
    name: string;
    species: string;
    room: string;
    pot: string;
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
