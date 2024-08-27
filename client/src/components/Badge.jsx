import { VStack, Image, Text } from "@chakra-ui/react"

function Badge({ badge }) {

    return (
        <VStack alignItems="center" alignContent="center">
            <Image
                boxSize="100px"
                src={`http://localhost:3030/${badge.imageFilePath}`}
                alt={`${badge.name}`}
            />
            <Text textAlign="center" fontSize="lg">
                {badge.name}
            </Text>
        </VStack>
    )

}

export { Badge }