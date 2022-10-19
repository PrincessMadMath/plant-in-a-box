import { useMutation, useQuery, useQueryClient } from "react-query";
import { createSpecies, getAllSpecies, getSpecies } from "shared/api/species/species.api";
import { CreateSpeciesCommand } from "shared/api/species/species.command";
import { Species } from "shared/api/species/species.models";

export function useGetAllSpecies() {
    return useQuery<Species[], any>("species", getAllSpecies);
}

export function useGetSpecies(speciesId: string) {
    return useQuery<Species, any>(["species", speciesId], () => getSpecies(speciesId));
}

export function useCreateSpecies() {
    const queryClient = useQueryClient();

    return useMutation<Species, Error, CreateSpeciesCommand>((mutation) => createSpecies(mutation), {
        onSuccess: async (data, variables, context) => {
            queryClient.invalidateQueries(["species"]);
        },
    });
}
