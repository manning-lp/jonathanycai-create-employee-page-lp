import { rest } from "msw";

import { server } from "../../__tests__/msw/server";
import { render, screen } from "../../__tests__/test-utils";
import { SearchResults } from "../SearchResults";

test("title contains 'all employees' when there's no search specified", async () => {
    render(<SearchResults />, { initialEntries: ["/q="] });

    const resultsTitle = await screen.findByRole("heading", { name: "All Employees (10)" });
    expect(resultsTitle).toBeInTheDocument();

    const links = await screen.findAllByRole("link");
    const employeeRouteRegex = /^\/employees\/\d\d?/;
    const employeeLinks = links.filter((link) =>
        employeeRouteRegex.test(link.getAttribute("href"))
    );
    expect(employeeLinks).toHaveLength(10);
});

test("title contains 'search results' when there's a search specified", async () => {
    render(<SearchResults />, { initialEntries: ["/?q=notempty"] });

    const resultsTitle = await screen.findByRole("heading", {
        name: "Search Results (10)",
    });
    expect(resultsTitle).toBeInTheDocument();

    const links = await screen.findAllByRole("link");
    const employeeRouteRegex = /^\/employees\/\d\d?/;
    const employeeLinks = links.filter((link) =>
        employeeRouteRegex.test(link.getAttribute("href"))
    );
    expect(employeeLinks).toHaveLength(10);
});

test("component lists no results if server returns empty array", async () => {
    server.use(
        rest.get("http://localhost:3030/employees", (req, res, ctx) =>
            res(ctx.json([]))
        )
    );

    render(<SearchResults />, { initialEntries: ["/?q=notempty"] });
    const resultsTitle = await screen.findByRole("heading", {
        name: "Search Results (0)",
    });
    expect(resultsTitle).toBeInTheDocument();

    const links = await screen.queryAllByRole("link");
    expect(links).toHaveLength(0);

})