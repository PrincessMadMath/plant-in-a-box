import {
    Box,
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useToast,
} from "@chakra-ui/react";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import React, { useState } from "react";
import { useUploadImage } from "shared/api";

interface UploadPictureModalProps {
    plantId: string;
    isOpen: boolean;
    onClose: () => void;
}

export const UploadPictureModal = ({ plantId, isOpen, onClose }: UploadPictureModalProps) => {
    const toast = useToast();
    const [file, setFile] = useState<File>();
    const uploadImageCommand = useUploadImage();

    const uploadImage = async () => {
        if (file !== undefined) {
            uploadImageCommand.mutate(
                {
                    plantId: plantId,
                    file: file,
                },
                {
                    onSuccess: () => {
                        onClose();
                    },
                }
            );
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Upload a picture of your plant</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Box>
                        <Dropzone
                            onDrop={(files) => {
                                setFile(files[0]);
                            }}
                            onReject={(files) => {
                                toast({
                                    title: "Invalid image",
                                    description: files[0].errors[0].message,
                                    status: "error",
                                    position: "top",
                                    isClosable: true,
                                });
                            }}
                            maxSize={16 * 1024 ** 2}
                            accept={[MIME_TYPES.png, MIME_TYPES.jpeg, MIME_TYPES.gif]}
                        >
                            <Text>{file !== undefined ? `${file.name}` : "Click me"}</Text>
                        </Dropzone>
                    </Box>
                </ModalBody>
                <ModalFooter>
                    <Button variant="ghost" mr={3} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button colorScheme="teal" onClick={uploadImage} isLoading={uploadImageCommand.isLoading}>
                        Upload
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
