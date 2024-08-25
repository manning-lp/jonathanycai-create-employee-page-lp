import { IconButton, Input, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react';
import { CloseIcon, SearchIcon } from "@chakra-ui/icons";
import { useSearchTerm } from '../hooks/useSearchTerm';
import { useNavigate } from 'react-router';

function SearchInput() {
    const [searchTerm, setSearchTerm] = useSearchTerm();

    const handleChange = (evt) => setSearchTerm(evt.target.value);
    const clearInput = () => setSearchTerm("");

    const navigate = useNavigate();
    const handleFocus = () => navigate(`/?q=${searchTerm}`);


    return (
        <InputGroup onFocus={handleFocus}>
            <InputLeftElement pointerEvents="none">
                <SearchIcon />
            </InputLeftElement>
            <Input
                value={searchTerm}
                onChange={handleChange}
                placeholder="search" />
            <InputRightElement>
                <IconButton aria-label="Clear Search" onClick={clearInput} icon={<CloseIcon />} />
            </InputRightElement>
        </InputGroup>
    )
}

export { SearchInput }