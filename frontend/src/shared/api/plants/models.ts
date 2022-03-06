export interface Plant {
    plantId: string;
    name: string;
    species: string;
    room: string;
    pot: string;
    acquisitionDate: string;
    operations: CaringOperations;
}

export interface CaringOperations {
    lastWateredDate: string;
    lastRepotDate: string;
    lastFertilizedDate: string;
}

export interface CreatePlantCommand {
    name: string;
    species: string;
    room: string;
    pot: string;
}
