import { rest } from "msw";
import { server } from "../../__tests__/msw/server";
import { employeesWithBadgeDetails } from "../../__tests__/test-data";
import { render, screen } from "../../__tests__/test-utils";
import { Employee } from "../Employee";

test('employee displays data received from server', async () => {
    render(<Employee />);
    const firstName = await screen.findByRole("heading", { name: /angélica/i });
    expect(firstName).toBeInTheDocument();

    const lastName = screen.getByText("Bustos");
    expect(lastName).toBeInTheDocument();

    const jobTitle = screen.getByText("VP Marketing");
    expect(jobTitle).toBeInTheDocument();

    const image = screen.getByRole("img", { name: /Angélica Bustos/i });
    expect(image).toHaveProperty(
        "src",
        "http://localhost:3030/images/employees/f-26.png"
    );

    const badgeImages = screen.getAllByRole("img", {
        name: /Karaoke Star|Fashionista/,
    });
    expect(badgeImages).toHaveLength(2);

    const badgeTitles = screen.getAllByText(/Karaoke Star|Fashionista/);
    expect(badgeTitles).toHaveLength(2);

    const addBadge = screen.getByText(/add new badge/i);
    expect(addBadge).toBeInTheDocument();
});

test("employee with no badges displays appropriate heading", async () => {
    // override the mocked response for employee data with an employee that
    // has noo badges
    server.use(
        rest.get("http://localhost:3030/employees/:id", (req, res, ctx) => {
            const employee = employeesWithBadgeDetails[1];
            return res(ctx.json(employee));
        })
    );
    render(<Employee />);
    const badgeHeading = await screen.findByRole("heading", { name: /no badges yet/i, });
    expect(badgeHeading).toBeInTheDocument();
});