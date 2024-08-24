import { Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
function Employee() {
    const { id } = useParams();
    const { isLoading, data } = useQuery(["employee", id], async () => {
        const employeeData = await fetch(`http://localhost:3030/employees/${id}`);
        return employeeData.json();
    });

    if (isLoading) return <Text>Loading...</Text>;

    return (
        <HStack align="center" spacing={10} justify="center">
            <Image
                src={`http://localhost:3030/${data.imageFilePath}`}
                alt={`${data.firstName} ${data.lastName}`}
                width="175px"
                height="175px"
            />
            <VStack>
                <HStack align="flex-start" >
                    <Heading fontSize="4xl">{data.firstName}</Heading>
                    <Text fontSize="2xl">{data.lastName}</Text>
                </HStack>
                <HStack align="baseline">
                    <Text fontSize="xl" text-align="right">{data.jobTitle}</Text>
                    <Text>|</Text>
                    <Text fontSize="med" text-align="right">{data.teamName}</Text>
                </HStack>
            </VStack>

            <Text color="white" />
        </HStack>
    )

}

export { Employee };