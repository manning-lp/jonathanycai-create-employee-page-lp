import { Spinner } from "@chakra-ui/react"
import { useIsFetching } from "@tanstack/react-query"

function Loading() {
    const isFetching = useIsFetching();

    return (
        <Spinner
            z-index={1}
            pos="fixed"
            top={0}
            bottom={0}
            left={0}
            right={0}
            margin="auto"
            size="xl"
            display={isFetching > 0 ? "inherit" : "none"}
        />
    )
}

export { Loading }