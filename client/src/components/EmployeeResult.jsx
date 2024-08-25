import { HStack, Image, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useSearchTerm } from "../hooks/useSearchTerm";

function EmployeeResult({ employee }) {
    const [searchTerm] = useSearchTerm();

    return (
        <Link to={`/employees/${employee.id}?q=${searchTerm}`}>
            <HStack boxShadow='md'>
                <Image
                    src={`http://localhost:3030/${employee.imageFilePath}`}
                    alt={`${employee.firstName} ${employee.lastName}`}
                    width="105px"
                    height="105px"
                />
                <VStack spacing={0} alignItems="flex-start">
                    <Text fontSize="2xl">
                        {employee.firstName} {employee.lastName}
                    </Text>
                    <Text fontSize="lg">{employee.teamName}</Text>
                </VStack>
            </HStack>
        </Link>
    )
}
export { EmployeeResult }