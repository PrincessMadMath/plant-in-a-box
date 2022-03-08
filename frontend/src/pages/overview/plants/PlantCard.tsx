import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Avatar,
    Box,
    Button,
    Collapse,
    Divider,
    Flex,
    Grid,
    HStack,
    Icon,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    Text,
    useDisclosure,
    VStack,
} from "@chakra-ui/react";
import React from "react";
import { FiChevronDown, FiChevronUp, FiDroplet } from "react-icons/fi";
import { GiBoxUnpacking, GiFertilizerBag, GiGreenhouse, GiPlantSeed } from "react-icons/gi";
import { MdCake } from "react-icons/md";
import { Plant, useFertilizePlant, useRepotPlant, useWaterPlant } from "shared/api";
import { formatFrom } from "shared/utils";

interface PlantCardProps {
    plant: Plant;
}

export const PlantCard = ({ plant }: PlantCardProps) => {
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Box w={"100%"} borderWidth="1px" borderRadius="lg" p={2}>
            <Grid templateColumns="max-content 1fr" gap={4}>
                <Avatar
                    name={plant.name}
                    size="xl"
                    src="https://images.pexels.com/photos/3192175/pexels-photo-3192175.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                />
                <Box>
                    <Flex justify={"space-between"} direction={"row"}>
                        <Text fontSize="2xl" pb={2}>
                            {plant.name}
                        </Text>
                        <IconButton
                            aria-label="Expand plant information."
                            onClick={onToggle}
                            icon={isOpen ? <Icon as={FiChevronUp} /> : <Icon as={FiChevronDown} />}
                        />
                    </Flex>
                    <HStack spacing={1}>
                        <Icon as={FiDroplet} color={"gray.400"} />
                        <Box fontSize="lg" color={"gray.400"}>
                            {formatOperationsDate(plant.operations?.lastWateredDate)}
                        </Box>
                    </HStack>
                    <HStack spacing={1}>
                        <Icon as={GiPlantSeed} color={"gray.500"} />
                        <Box fontSize="m" color={"gray.500"}>
                            {plant.species}
                        </Box>
                    </HStack>
                    <Collapse in={isOpen} animateOpacity>
                        <Box mt="4">
                            <PlantExtraInfo plant={plant} />
                        </Box>
                    </Collapse>
                </Box>
            </Grid>
            <Collapse in={isOpen} animateOpacity>
                <Divider mt={4} mb={4} />
                <Box>
                    <PlantOperations plant={plant} />
                </Box>
            </Collapse>
        </Box>
    );
};

interface PlantExtraInfoProps {
    plant: Plant;
}

const PlantExtraInfo = ({ plant }: PlantExtraInfoProps) => {
    return (
        <Box>
            <HStack spacing={1}>
                <Icon as={GiFertilizerBag} color={"gray.500"} />
                <Box fontSize="m" color={"gray.500"}>
                    {formatOperationsDate(plant.operations?.lastFertilizedDate)}
                </Box>
            </HStack>
            <HStack spacing={1}>
                <Icon as={GiBoxUnpacking} color={"gray.500"} />
                <Box fontSize="m" color={"gray.500"}>
                    {formatOperationsDate(plant.operations?.lastRepotDate)}
                </Box>
            </HStack>
            <HStack spacing={1}>
                <Icon as={MdCake} color={"gray.500"} />
                <Box fontSize="m" color={"gray.500"}>
                    {formatOperationsDate(plant.acquisitionDate)}
                </Box>
            </HStack>
            <HStack spacing={1}>
                <Icon as={GiGreenhouse} color={"gray.500"} />
                <Box fontSize="m" color={"gray.500"}>
                    {plant.room} - {plant.pot}
                </Box>
            </HStack>
        </Box>
    );
};

interface PlantOperationsProps {
    plant: Plant;
}

const PlantOperations = ({ plant }: PlantOperationsProps) => {
    return (
        <Box>
            <VStack spacing={4}>
                <WaterOperation plant={plant} />
                <FertilizeOperation plant={plant} />
                <RepotOperation plant={plant} />
            </VStack>
        </Box>
    );
};

const WaterOperation = ({ plant }: PlantOperationsProps) => {
    const waterCommand = useWaterPlant();

    return (
        <Button
            leftIcon={<FiDroplet />}
            isFullWidth
            isLoading={waterCommand.isLoading}
            onClick={() => waterCommand.mutate({ plantId: plant.plantId })}
            colorScheme="teal"
        >
            Water
        </Button>
    );
};

const FertilizeOperation = ({ plant }: PlantOperationsProps) => {
    const fertilizeCommand = useFertilizePlant();

    return (
        <Button
            leftIcon={<GiFertilizerBag />}
            isFullWidth
            isLoading={fertilizeCommand.isLoading}
            onClick={() => fertilizeCommand.mutate({ plantId: plant.plantId })}
            colorScheme="teal"
            variant="outline"
        >
            Fertilize
        </Button>
    );
};

const RepotOperation = ({ plant }: PlantOperationsProps) => {
    const repotCommand = useRepotPlant();

    const [value, setValue] = React.useState("");
    const handleChange = (event: any) => setValue(event.target.value);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef() as any;

    return (
        <>
            <Button
                leftIcon={<GiBoxUnpacking />}
                isLoading={repotCommand.isLoading}
                onClick={onOpen}
                isFullWidth
                colorScheme="teal"
                variant="outline"
            >
                Repot
            </Button>
            <AlertDialog
                motionPreset="slideInBottom"
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
            >
                <AlertDialogOverlay />

                <AlertDialogContent>
                    <AlertDialogHeader>Repot Plant?</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        <InputGroup>
                            <InputLeftElement pointerEvents="none" children={<Icon as={GiBoxUnpacking} />} />
                            <Input value={value} onChange={handleChange} placeholder="Entre new pot name" size="md" />
                        </InputGroup>
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            colorScheme="red"
                            ml={3}
                            onClick={() => {
                                repotCommand.mutate({ plantId: plant.plantId, pot: value });
                                onClose();
                            }}
                        >
                            Repot
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

const formatOperationsDate = (date: string) => {
    if (date == null) {
        return "Never";
    }

    return formatFrom(date);
};
