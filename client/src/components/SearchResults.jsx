import { useSearchParams } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import { Heading, SimpleGrid } from '@chakra-ui/react'
import { EmployeeResult } from './EmployeeResult';

function SearchResults() {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("q") || "";

    const { data: searchResults, isLoading } = useQuery(["search", searchQuery], async () => {
        const response = await fetch(`http://localhost:3030/employees/${searchQuery}`);
        return response.json();
    });

    if (isLoading) return "...Loading";

    return (
        <>
            <Heading size="md" pb={4}>
                {searchQuery ? "Search Results" : "All Employees"} ({searchResults.length})
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