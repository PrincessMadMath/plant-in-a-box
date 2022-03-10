import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import { useCreatePlant } from "shared/api";
import { Formik, Field, Form } from "formik";

interface PlantFormModalProps {
    onClose: () => void;
    isOpen: boolean;
}

export const CreatePlantModal = ({ onClose, isOpen }: PlantFormModalProps) => {
    const createPlantCommand = useCreatePlant();

    return (
        <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} isCentered>
            <Formik
                initialValues={{ name: "", species: "", room: "", pot: "" }}
                onSubmit={async (values, actions) => {
                    createPlantCommand.mutate(
                        {
                            name: values.name,
                            species: values.species,
                            room: values.room,
                            pot: values.pot,
                        },
                        {
                            onSuccess: () => {
                                debugger;
                                actions.setSubmitting(false);
                            },
                            onSettled: () => {
                                debugger;
                                onClose();
                            },
                        }
                    );
                }}
            >
                {(props) => (
                    <Form>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Create Plant</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Box>
                                    <Field name="name">
                                        {({ field }: any) => (
                                            <FormControl>
                                                <FormLabel htmlFor="name">Plant Name</FormLabel>
                                                <Input id="name" type="text" {...field} />
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name="species">
                                        {({ field }: any) => (
                                            <FormControl>
                                                <FormLabel htmlFor="species">Species</FormLabel>
                                                <Input id="species" type="text" {...field} />
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name="room">
                                        {({ field }: any) => (
                                            <FormControl>
                                                <FormLabel htmlFor="room">Room</FormLabel>
                                                <Input id="room" type="text" {...field} />
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name="pot">
                                        {({ field }: any) => (
                                            <FormControl>
                                                <FormLabel htmlFor="pot">Pot</FormLabel>
                                                <Input id="pot" type="text" {...field} />
                                            </FormControl>
                                        )}
                                    </Field>
                                </Box>
                            </ModalBody>

                            <ModalFooter>
                                <Button variant="ghost" mr={3} onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button type={"submit"} isLoading={props.isSubmitting} colorScheme="teal">
                                    Add plant
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
};
