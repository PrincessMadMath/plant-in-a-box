import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    Icon,
    Input,
    InputGroup,
    InputLeftElement,
    useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { GiBoxUnpacking } from "react-icons/gi";
import { Plant, useRepotPlant } from "shared/api";

interface RepotOperationProps {
    plant: Plant;
}

export const RepotOperation = ({ plant }: RepotOperationProps) => {
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
                width="full"
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
