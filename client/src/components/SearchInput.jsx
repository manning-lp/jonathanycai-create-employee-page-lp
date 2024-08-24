import { useSearchParams } from 'react-router-dom';
import { IconButton, Input, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react';
import { CloseIcon, SearchIcon } from "@chakra-ui/icons";

function SearchInput() {
    const [searchParams, setSearchParams] = useSearchParams({ q: "" });
    const searchQuery = searchParams.get("q") || "";

    const handleChange = (evt) => {
        const newQuery = evt.target.value;
        setSearchParams({ q: newQuery });
    }
    const clearInput = () => setSearchParams({ q: "" });

    return (
        <InputGroup>
            <InputLeftElement pointerEvents="none">
                <SearchIcon />
            </InputLeftElement>
            <Input
                value={searchQuery}
                onChange={handleChange}
                placeholder="search" />
            <InputRightElement>
                <IconButton aria-label="Clear Search" onClick={clearInput} icon={<CloseIcon />} />
            </InputRightElement>
        </InputGroup>
    )
}

export { SearchInput }