import {
    Avatar,
    Box,
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
    Button,
} from "@chakra-ui/react";
import { DatePicker } from "@mantine/dates";
import { DeleteOperation } from "pages/overview/plants/DeleteOperation";
import { FertilizeOperation } from "pages/overview/plants/FertilizeOperation";
import { RepotOperation } from "pages/overview/plants/RepotOperation";
import { UpdatePlantModal } from "pages/overview/plants/UpdatePlantModal";
import { UploadPictureModal } from "pages/overview/plants/UploadPictureModal";
import { WaterOperation } from "pages/overview/plants/WaterOperation";
import React from "react";
import { FiChevronDown, FiChevronUp, FiDroplet, FiEdit } from "react-icons/fi";
import { GiBoxUnpacking, GiFertilizerBag, GiGreenhouse } from "react-icons/gi";
import { MdCake } from "react-icons/md";
import { Plant } from "shared/api";
import { formatFrom } from "shared/utils";
import {getPlantImage} from "../../../shared/api/plants/plants.api";

interface PlantCardProps {
    plant: Plant;
}

export const PlantCard = ({ plant }: PlantCardProps) => {
    const { isOpen: isExpanded, onToggle: onToggleExpand } = useDisclosure();
    const { isOpen: isUpdateOpen, onOpen: onOpenUpdate, onClose: onCloseUpdate } = useDisclosure();
    const { isOpen: isUploadOpen, onOpen: onOpenUpload, onClose: onCloseUpload } = useDisclosure();

    return (
        <Box w={"100%"} borderWidth="1px" borderRadius="lg" p={2}>
            <Grid templateColumns="max-content 1fr" gap={4}>
                <Avatar
                    name={plant.name}
                    size="xl"
                    src= {getPlantImage(plant.plantId)}
                    onClick={() => {
                        console.log("Click");
                        onOpenUpload();
                    }}
                />
                <Box>
                    <Flex justify={"space-between"} direction={"row"}>
                        <Text fontSize="2xl">{plant.name}</Text>
                        <IconButton
                            aria-label="Expand plant information."
                            onClick={onToggleExpand}
                            icon={isExpanded ? <Icon as={FiChevronUp} /> : <Icon as={FiChevronDown} />}
                        />
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
                <Button leftIcon={<FiEdit />} isFullWidth onClick={openUpdate}>
                    Edit
                </Button>
                <DeleteOperation plant={plant} />
                <DatePicker placeholder="Pick date" />
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
