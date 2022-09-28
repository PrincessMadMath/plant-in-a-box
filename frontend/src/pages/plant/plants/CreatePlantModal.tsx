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
import { Autocomplete } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { Field, FieldProps, Form, Formik } from "formik";
import React from "react";
import { useCreatePlant } from "shared/api";
import { useGetAllSpecies } from "shared/api/species/species.hooks";

interface CreatePlantModalProps {
    onClose: () => void;
    isOpen: boolean;
}

export const CreatePlantModal = ({ onClose, isOpen }: CreatePlantModalProps) => {
    const createPlantCommand = useCreatePlant();

    const { data: species } = useGetAllSpecies();
    const speciesName = species?.map((x) => x.name) ?? [];

    return (
        <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} isCentered>
            <Formik
                initialValues={{ name: "", species: "", room: "", pot: "", acquisitionDate: new Date() }}
                onSubmit={async (values, actions) => {
                    createPlantCommand.mutate(
                        {
                            name: values.name,
                            species: values.species,
                            room: values.room,
                            pot: values.pot,
                            acquisitionDate: values.acquisitionDate.toISOString(),
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
                            <ModalHeader>Create Plant</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Box>
                                    <Field name="name">
                                        {({ field }: FieldProps) => (
                                            <FormControl>
                                                <FormLabel htmlFor="name">Plant Name</FormLabel>
                                                <Input id="name" type="text" {...field} />
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name="species">
                                        {({ field }: FieldProps) => (
                                            <FormControl>
                                                <FormLabel htmlFor="species">Species</FormLabel>
                                                <Autocomplete
                                                    {...field}
                                                    zIndex={10000}
                                                    onChange={(data) => {
                                                        props.setFieldValue("species", data);
                                                    }}
                                                    data={speciesName}
                                                />
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name="room">
                                        {({ field }: FieldProps) => (
                                            <FormControl>
                                                <FormLabel htmlFor="room">Room</FormLabel>
                                                <Input id="room" type="text" {...field} />
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name="pot">
                                        {({ field }: FieldProps) => (
                                            <FormControl>
                                                <FormLabel htmlFor="pot">Pot</FormLabel>
                                                <Input id="pot" type="text" {...field} />
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name="acquisitionDate">
                                        {({ field }: FieldProps) => (
                                            <FormControl>
                                                <FormLabel htmlFor="acquisitionDate">Acquisition date</FormLabel>
                                                <DatePicker
                                                    placeholder="Pick date"
                                                    zIndex={10000}
                                                    {...field}
                                                    onChange={(data) => {
                                                        props.setFieldValue("acquisitionDate", data);
                                                    }}
                                                />
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
