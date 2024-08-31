import { render, screen } from "../../__tests__/test-utils";
import { EmployeeResult } from "../EmployeeResult"

const employee = {
    id: 41,
    firstName: "Angélica",
    lastName: "Bustos",
    imageFilePath: "images/employees/f-26.png",
    teamName: "Marketing",
    jobTitle: "VP Marketing",
    badgeIds: [2],
}

test('Employee Result displays correct information and link', () => {
    render(<EmployeeResult employee={employee} />);

    const employeeName = screen.getByText("Angélica Bustos")
    expect(employeeName).toBeInTheDocument();

    const teamName = screen.getByText("Marketing")
    expect(teamName).toBeInTheDocument();

    const link = screen.getByRole("link")
    expect(link).toHaveAttribute('href', '/employees/41?q=')

    const employeeImage = screen.getByRole("img", { name: 'Angélica Bustos' });
    expect(employeeImage).toHaveAttribute('src', 'http://localhost:3030/images/employees/f-26.png')

})