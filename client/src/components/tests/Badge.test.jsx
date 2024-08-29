import { render, screen } from "@testing-library/react";
import { Badge } from "../Badge";

const badge = {
    id: 2,
    name: "Karaoke Star",
    imageFilePath: "images/badges/karaoke.png",
};

test('Badge component renders detail from badge prop data', () => {
    render(<Badge badge={badge} />);

    const badgeName = screen.getByText("Karaoke Star");
    expect(badgeName).toBeInTheDocument();

    const imgRole = screen.getByRole("img");
    expect(imgRole).toBeInTheDocument();
});
