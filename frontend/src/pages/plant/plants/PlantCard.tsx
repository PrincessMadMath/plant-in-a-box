import {
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
    Text,
    useDisclosure,
    VStack,
} from "@chakra-ui/react";
import React from "react";
import { FiChevronDown, FiChevronUp, FiDroplet, FiEdit, FiFileText } from "react-icons/fi";
import { GiBoxUnpacking, GiFertilizerBag, GiGreenhouse } from "react-icons/gi";
import { MdCake } from "react-icons/md";
import { useHistory } from "react-router-dom";
import { Plant, useGetPlantImageSource2 } from "shared/api";
import { formatFrom } from "shared/utils";
import { DeleteOperation } from "./DeleteOperation";
import { FertilizeOperation } from "./FertilizeOperation";
import { RepotOperation } from "./RepotOperation";
import { UpdatePlantModal } from "./UpdatePlantModal";
import { UploadPictureModal } from "./UploadPictureModal";
import { WaterOperation } from "./WaterOperation";

interface PlantCardProps {
    plant: Plant;
}

export const PlantCard = ({ plant }: PlantCardProps) => {
    const { isOpen: isExpanded, onToggle: onToggleExpand } = useDisclosure();
    const { isOpen: isUpdateOpen, onOpen: onOpenUpdate, onClose: onCloseUpdate } = useDisclosure();
    const { isOpen: isUploadOpen, onOpen: onOpenUpload, onClose: onCloseUpload } = useDisclosure();

    const history = useHistory();

    const imageSource = useGetPlantImageSource2(plant.plantId, plant.image.etag);

    return (
        <Box w={"100%"} borderWidth="1px" borderRadius="lg" p={2}>
            <Grid templateColumns="max-content 1fr" gap={4}>
                <Avatar
                    name={plant.name}
                    size="xl"
                    src={imageSource}
                    onClick={() => {
                        console.log("Click");
                        onOpenUpload();
                    }}
                />
                <Box>
                    <Flex justify={"space-between"} direction={"row"}>
                        <Text fontSize="2xl">{plant.name}</Text>
                        <HStack>
                            <IconButton
                                icon={<FiFileText />}
                                onClick={() => {
                                    history.push(`/plant/${plant.plantId}`);
                                }}
                                aria-label="See details."
                            />
                            <IconButton
                                aria-label="Expand plant information."
                                onClick={onToggleExpand}
                                icon={isExpanded ? <Icon as={FiChevronUp} /> : <Icon as={FiChevronDown} />}
                            />
                        </HStack>
                    </Flex>
                    <HStack spacing={1}>
                        <Icon as={FiDroplet} color={"gray.400"} />
                        <Text fontSize="lg" color={"gray.400"}>
                            {formatOperationsDate(plant.operations?.lastWateredDate)}
                        </Text>
                    </HStack>
                    <HStack spacing={1}>
                        <Text fontSize="m" color={"gray.400"} as="i">
                            {plant.species}
                        </Text>
                    </HStack>
                </Box>
            </Grid>
            <Collapse in={isExpanded} animateOpacity>
                <Box mt="4">
                    <PlantExtraInfo plant={plant} />
                </Box>
                <Divider mt={4} mb={4} />
                <Box>
                    <PlantOperations plant={plant} openUpdate={onOpenUpdate} />
                </Box>
            </Collapse>
            <UpdatePlantModal plant={plant} onClose={onCloseUpdate} isOpen={isUpdateOpen} />
            <UploadPictureModal plantId={plant.plantId} isOpen={isUploadOpen} onClose={onCloseUpload} />
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
                <Text fontSize="m" color={"gray.500"}>
                    Last Fertilize:
                </Text>
                <Text fontSize="m" color={"gray.500"}>
                    {formatOperationsDate(plant.operations?.lastFertilizedDate)}
                </Text>
            </HStack>
            <HStack spacing={1}>
                <Icon as={GiBoxUnpacking} color={"gray.500"} />
                <Text fontSize="m" color={"gray.500"}>
                    Last Repot:
                </Text>
                <Text fontSize="m" color={"gray.500"}>
                    {formatOperationsDate(plant.operations?.lastRepotDate)}
                </Text>
            </HStack>
            <HStack spacing={1}>
                <Icon as={MdCake} color={"gray.500"} />
                <Text fontSize="m" color={"gray.500"}>
                    With you since
                </Text>
                <Text fontSize="m" color={"gray.500"}>
                    {formatOperationsDate(plant.acquisitionDate)}
                </Text>
            </HStack>
            <HStack spacing={1}>
                <Icon as={GiGreenhouse} color={"gray.500"} />
                <Text fontSize="m" color={"gray.500"}>
                    Location:
                </Text>
                <Text fontSize="m" color={"gray.500"}>
                    {plant.room} - {plant.pot}
                </Text>
            </HStack>
        </Box>
    );
};

interface PlantOperationsProps {
    plant: Plant;
    openUpdate: () => void;
}

const PlantOperations = ({ plant, openUpdate }: PlantOperationsProps) => {
    return (
        <Box>
            <VStack spacing={4}>
                <WaterOperation plant={plant} />
                <FertilizeOperation plant={plant} />
                <RepotOperation plant={plant} />
                <Button leftIcon={<FiEdit />} width="full" onClick={openUpdate}>
                    Edit
                </Button>
                <DeleteOperation plant={plant} />
            </VStack>
        </Box>
    );
};

const formatOperationsDate = (date: string) => {
    if (date == null) {
        return "Never";
    }

    return formatFrom(date);
};
