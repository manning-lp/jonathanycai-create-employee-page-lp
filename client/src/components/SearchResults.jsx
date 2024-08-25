import { useQuery } from "@tanstack/react-query";
import { Heading, SimpleGrid } from '@chakra-ui/react'
import { EmployeeResult } from './EmployeeResult';
import { useSearchTerm } from '../hooks/useSearchTerm';

function SearchResults() {
    const [searchTerm] = useSearchTerm();

    const { data: searchResults, isLoading } = useQuery(["search", searchTerm], async () => {
        const response = await fetch(`http://localhost:3030/employees?q=${searchTerm}`);
        return response.json();
    });

    if (isLoading) return "...Loading";

    return (
        <>
            <Heading size="md" pb={4}>
                {searchTerm ? "Search Results" : "All Employees"} ({searchResults.length})
            </Heading>
            <SimpleGrid columns={2} spacing={4}>
                {searchResults.map((employee) => (
                    <EmployeeResult key={employee.id} employee={employee} />
                ))}
            </SimpleGrid>
        </>

    )
}

export { SearchResults }