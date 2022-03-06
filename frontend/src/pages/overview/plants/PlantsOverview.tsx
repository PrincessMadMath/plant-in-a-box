import {
    Box,
    Button,
    Center,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spinner,
    useBreakpointValue,
    useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useCreatePlant, useGetPlants } from "shared/api";
import { PlantCards } from "./PlantCards";

export const PlantsOverview = () => {
    const { isLoading: isPlantsLoading, data: plants } = useGetPlants();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const useTable = useBreakpointValue({ base: false, lg: true });

    if (isPlantsLoading) {
        return (
            <Box>
                <Center>
                    <Spinner />
                </Center>
            </Box>
        );
    }

    if (!plants || plants.length === 0) {
        return (
            <Box mt="8">
                <Heading as="h2" size="md">
                    Plants (none registered)
                </Heading>
            </Box>
        );
    }

    return (
        <Box mt="8">
            <HStack justify={"space-between"}>
                <Heading as="h2" size="lg">
                    Plants
                </Heading>
                <Button onClick={onOpen}>Add a plant</Button>
            </HStack>
            <CreatePlantModel onClose={onClose} isOpen={isOpen} />
            {/*{useTable ? <PlantsTable plants={plants} /> : <PlantCards plants={plants} />}*/}
            <PlantCards plants={plants} />
        </Box>
    );
};

interface CreatePlantModelProps {
    onClose: () => void;
    isOpen: boolean;
}

const CreatePlantModel = ({ onClose, isOpen }: CreatePlantModelProps) => {
    const createPlantCommand = useCreatePlant();

    const [name, setName] = React.useState("");
    const handleNameChange = (event: any) => setName(event.target.value);

    const [species, setSpecies] = React.useState("");
    const handleSpeciesChange = (event: any) => setSpecies(event.target.value);

    const [room, setRoom] = React.useState("");
    const handleRoomChange = (event: any) => setRoom(event.target.value);

    const [pot, setPot] = React.useState("");
    const handlePotChange = (event: any) => setPot(event.target.value);

    return (
        <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Box>
                        <FormControl>
                            <FormLabel htmlFor="name">Plant Name</FormLabel>
                            <Input id="name" type="text" value={name} onChange={handleNameChange} />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="species">Species</FormLabel>
                            <Input id="species" type="text" value={species} onChange={handleSpeciesChange} />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="name">Room</FormLabel>
                            <Input id="name" type="text" value={room} onChange={handleRoomChange} />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="name">Pot</FormLabel>
                            <Input id="name" type="text" value={pot} onChange={handlePotChange} />
                        </FormControl>
                    </Box>
                </ModalBody>

                <ModalFooter>
                    <Button variant="ghost" mr={3} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button
                        colorScheme="teal"
                        onClick={() => {
                            createPlantCommand.mutate({
                                name: name,
                                species: species,
                                room: room,
                                pot: pot,
                            });
                            onClose();
                        }}
                    >
                        Add plant
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
