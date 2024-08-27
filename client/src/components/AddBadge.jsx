import { AddIcon } from "@chakra-ui/icons"
import { IconButton, VStack, Text } from "@chakra-ui/react"

function AddBadge({ employee }) {
    return (
        <VStack>
            <IconButton
                aria-label="add badge"
                width="100px"
                height="100px"
                isRound
                icon={<AddIcon />}
            />
            <Text size="lg">Add new badge</Text>
        </ VStack>
    )
}

export { AddBadge }