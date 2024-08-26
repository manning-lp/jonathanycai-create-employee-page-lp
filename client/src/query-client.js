import { QueryClient, QueryCache } from "@tanstack/react-query";
import { toast } from "./components/Toast";

export const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError: (error) =>
            toast({
                title: "Server Error",
                description: error.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            }),
    }),
});