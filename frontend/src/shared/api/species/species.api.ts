import {CreateSpeciesCommand} from "shared/api/species/species.command";
import {Species} from "shared/api/species/species.models";
import {getJsonAxios, postJsonAxios} from "shared/api/utils";

export const getAllSpecies = (): Promise<Species[]> => {
    return getJsonAxios<Species[]>(`species`);
};

export const getSpecies = (speciesId: string): Promise<Species> => {
    return getJsonAxios<Species>(`species/${speciesId}`);
};

export const createSpecies = (createPlant: CreateSpeciesCommand): Promise<Species> => {
    return postJsonAxios(`species/create`, createPlant);
};
