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
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

function AddBadge({ employee }) {

    const [newBadgeId, setNewBadgeId] = useState();
    const handleSelectChange = (evt) => {
        setNewBadgeId(evt.target.value);
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

    const onSubmit = () => {
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
                        <Button variant="ghost" onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export { AddBadge }