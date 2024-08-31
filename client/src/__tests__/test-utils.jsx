import { render } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";

const AllTheProviders = ({ children }) => {
    return (
        <React.StrictMode>
            <MemoryRouter>{children}</MemoryRouter>
        </React.StrictMode>
    )
}

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";

export { customRender as render }