import userEvent from '@testing-library/user-event';
import { render, screen } from "../../__tests__/test-utils";
import { AddBadge } from "../AddBadge";

const employee = {
    id: 41,
    firstName: "Angélica",
    lastName: "Bustos",
    imageFilePath: "images/employees/f-26.png",
    teamName: "Marketing",
    jobTitle: "VP Marketing",
    badgeIds: [2, 3],
    badgeDetails: [
        {
            id: 2,
            name: "Karaoke Star",
            imageFilePath: "images/badges/karaoke.png",
        },
        {
            id: 3,
            name: "Fashionista",
            imageFilePath: "images/badges/fashionista.png",
        },
    ],
};

test("badge options do not include existing badges for employee", async () => {
    const user = userEvent.setup();
    render(<AddBadge employee={employee} />);

    // find and click the add badge buttons
    const addBadgeButton = screen.getByRole("button", { name: /add new badge/i });
    await user.click(addBadgeButton);

    // wait for badges to load by retrieving a badge
    const teamPlayerOption = await screen.findByRole("option", { name: /Team Player/i, });

    // check the badge options
    // excludes badges the employee already has
    // includes placeholder option of "Select Badge"
    const badgeOptions = screen.getAllByRole("option");
    expect(badgeOptions.map((option) => option.text)).toEqual([
        "Select Badge",
        "Comic Relief",
        "Helping Hand",
        "Nice Kicks",
        "Team Player",
    ]);
});

test("error displays when submitting without choosing badge", async () => {
    const user = userEvent.setup();
    render(<AddBadge employee={employee} />);

    // find and click the add badge buttons
    const addBadgeButton = screen.getByRole("button", { name: /add new badge/i });
    await user.click(addBadgeButton);

    // wait for badges to load by retrieving a badge
    const teamPlayerOption = await screen.findByRole("option", { name: /Team Player/i });

    // ensures error doesn't display
    expect(screen.queryByText(/please select badge/i)).not.toBeInTheDocument();

    // ensures error displays after click
    const submitButton = screen.getByRole("button", { name: /add badge/i });
    await user.click(submitButton);
    const error = screen.getByText("Please select badge");
    expect(error).toBeInTheDocument();
});

test("no error displays when submitting after choosing badge", async () => {
    const user = userEvent.setup();
    render(<AddBadge employee={employee} />);

    // find and click the add badge buttons
    const addBadgeButton = screen.getByRole("button", { name: /add new badge/i });
    await user.click(addBadgeButton);

    // wait for badges to load by retrieving a badge
    const teamPlayerOption = await screen.findByRole("option", { name: /Team Player/i });

    await user.selectOptions(
        // find select element
        screen.getByRole("combobox"),
        // find and select the Team Player option
        screen.getByRole("option", { name: "Team Player" })
    );
    expect(screen.getByRole("option", { name: "Team Player" }).selected).toBe(true);

    // ensure error does not display after click
    const submitButton = screen.getByRole("button", { name: /add badge/i });
    await user.click(submitButton);
    expect(screen.queryByText(/please select badge/i)).not.toBeInTheDocument();
});