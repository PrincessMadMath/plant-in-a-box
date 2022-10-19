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
import { duration } from "dayjs";
import { Field, FieldProps, Form, Formik } from "formik";
import React from "react";
import { useCreateSpecies } from "shared/api/species/species.hooks";
import { toTimespan } from "shared/utils/duration";

interface CreateSpeciesModalProps {
    onClose: () => void;
    isOpen: boolean;
}

export const CreateSpeciesModal = ({ onClose, isOpen }: CreateSpeciesModalProps) => {
    const createSpeciesCommand = useCreateSpecies();

    return (
        <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} isCentered>
            <Formik
                initialValues={{ name: "", wateringFrequency: 14, fertilizationFrequency: 14 }}
                onSubmit={async (values, actions) => {
                    createSpeciesCommand.mutate(
                        {
                            name: values.name,
                            wateringFrequency: toTimespan(duration(values.wateringFrequency, "days")),
                            fertilizationFrequency: toTimespan(duration(values.fertilizationFrequency, "days")),
                        },
                        {
                            onSuccess: () => {
                                actions.setSubmitting(false);
                            },
                            onSettled: () => {
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
                            <ModalHeader>Create Species</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Box>
                                    <Field name="name">
                                        {({ field }: FieldProps) => (
                                            <FormControl>
                                                <FormLabel htmlFor="name">Species Name</FormLabel>
                                                <Input id="name" type="text" {...field} />
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name="wateringFrequency">
                                        {({ field }: FieldProps) => (
                                            <FormControl>
                                                <FormLabel htmlFor="wateringFrequency">
                                                    Watering Frequency (in days)
                                                </FormLabel>
                                                <Input id="wateringFrequency" type="text" {...field} />
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name="fertilizationFrequency">
                                        {({ field }: FieldProps) => (
                                            <FormControl>
                                                <FormLabel htmlFor="fertilizationFrequency">
                                                    Fertilization Frequency (in days)
                                                </FormLabel>
                                                <Input id="fertilizationFrequency" type="text" {...field} />
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
                                    Add species
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
};
