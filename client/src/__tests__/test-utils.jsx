import { QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { queryClient } from "../query-client";

const AllTheProviders = ({ children }) => {
    return (
        <React.StrictMode>
            <MemoryRouter>
                <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
            </MemoryRouter>
        </React.StrictMode>
    )
}

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";

export { customRender as render }