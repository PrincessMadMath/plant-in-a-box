import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { FiDroplet } from "react-icons/fi";
import { Plant, useDeletePlant } from "shared/api";

interface DeleteOperationProps {
    plant: Plant;
}

export const DeleteOperation = ({ plant }: DeleteOperationProps) => {
    const deleteCommand = useDeletePlant();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef() as any;

    return (
        <>
            <Button
                leftIcon={<FiDroplet />}
                width="full"
                isLoading={deleteCommand.isLoading}
                onClick={onOpen}
                colorScheme="red"
            >
                Delete
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
                    <AlertDialogHeader>RIP Plant?</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>Are you sure it is dead?</AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            colorScheme="red"
                            ml={3}
                            onClick={() => {
                                deleteCommand.mutate({ plantId: plant.plantId });
                                onClose();
                            }}
                        >
                            Delete
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};
