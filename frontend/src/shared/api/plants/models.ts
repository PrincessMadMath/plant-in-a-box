export interface Plant {
    plantId: string;
    name: string;
    species: string;
    room: string;
    pot: string;
    acquisitionDate: string;
    operations: CaringOperations;
    image: Image;
}

export interface CaringOperations {
    lastWateredDate: string;
    lastRepotDate: string;
    lastFertilizedDate: string;
}

export interface Image {
    etag: string;
}
