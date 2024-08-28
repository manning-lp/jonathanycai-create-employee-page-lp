import { AddIcon } from "@chakra-ui/icons"
import {
    Button,
    IconButton,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
    VStack,
    Select,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "./Toast";

function AddBadge({ employee }) {
    const queryClient = useQueryClient();
    const [newBadgeId, setNewBadgeId] = useState();
    const [badgeSelectionError, setBadgeSelectionError] = useState(false);

    const handleSelectChange = (evt) => {
        setNewBadgeId(evt.target.value);
        setBadgeSelectionError(false);
    }

    const { isOpen, onOpen, onClose } = useDisclosure()

    const alphabetSort = (data) => data.sort((a, b) => (b.name > a.name ? -1 : 1));

    const { isLoading, data: allBadges } = useQuery(
        ["badges", "all"], async () => {
            const response = await fetch("http://localhost:3030/badges");
            return response.json();
        },
        { select: alphabetSort }
    )

    const { mutate: addBadge } = useMutation(
        async ({ employeeId, badgeId }) => {
            const response = await fetch(`http://localhost:3030/employees/${employeeId}/badges?badgeId=${badgeId}`,
                { method: `PATCH`, }
            )
            if (response.status >= 400) {
                toast({
                    title: "Failed to add a badge",
                    description: response.statusText,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
                throw new Error(response.statusText);
            }
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["employee", employee.id.toString()]);
                toast({
                    title: "Badge Added",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                })
            }
        }
    );

    const onSubmit = () => {
        if (!newBadgeId && newBadgeId !== 0) {
            setBadgeSelectionError(true);
        } else {
            addBadge({ badgeId: newBadgeId, employeeId: employee.id });
            setNewBadgeId(undefined);
            onClose();
        }
    }

    const onCancel = () => {
        setNewBadgeId(undefined);
        setBadgeSelectionError(false);
        onClose();
    }

    return (
        <>
            <VStack>
                <IconButton
                    onClick={onOpen}
                    aria-label="add badge"
                    width="100px"
                    height="100px"
                    isRound
                    icon={<AddIcon />}
                />
                <Text size="lg">Add new badge</Text>
            </ VStack>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add New Badge</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {badgeSelectionError ? (
                            <Text textAlign="center" color="red" fontWeight={800}>
                                Please select badge
                            </Text>
                        ) : null}
                        <Select
                            placeholder="Select Badge"
                            onChange={handleSelectChange}
                            id="badge"
                            value={newBadgeId}
                        >
                            {isLoading
                                ? "Loading..." :
                                allBadges.filter(badge => !employee.badgeIds.includes(badge.id))
                                    .map((badge) => (
                                        <option key={`${badge.id}`} value={`${badge.id}`}>
                                            {`${badge.name}`}
                                        </option>
                                    ))
                            }
                        </Select>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onSubmit}>
                            Add badge
                        </Button>
                        <Button variant="ghost" onClick={onCancel}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export { AddBadge }