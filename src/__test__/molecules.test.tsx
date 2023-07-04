import { fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useThemeRenderWithRedux } from "@libs/jest-utils";
import { Input } from "@components/atoms";
import { SelectWithLabel, TextboxWithLabel } from "@components/molecules";

jest.mock("next/router", () => require("next-router-mock"));

describe("Components: molecules unit test", () => {
    const user = userEvent.setup();

    test("TextboxWithLabel", async () => {
        let inputVal = "";

        useThemeRenderWithRedux(
            <TextboxWithLabel
                label="test label"
                currentValue={inputVal}
                onChange={({ currentTarget: { value } }) => {
                    inputVal = value;
                }}
            />
        );

        const input = await screen.findByRole("textbox");
        const label = screen.getByText(/test label/i);
        expect(input).toBeInTheDocument();
        expect(input).toBeEnabled();
        expect(label).toBeInTheDocument();

        // await user.type(input, "input testing");
        fireEvent.change(input, { target: { value: "input testing" } });
        expect(inputVal).toBe("input testing");

        await user.click(label);
        await user.keyboard("a");
        expect(inputVal).toBe("a");
    });

    test("SelectWithLabel", async () => {
        const [choco, banana, berry] = ["choco", "banana", "berry"];
        let selected = choco;

        useThemeRenderWithRedux(
            <SelectWithLabel
                label="test label"
                selectedValue={selected}
                options={[choco, banana, berry]}
                onChange={({ target: { value } }) => {
                    selected = value;
                }}
            />
        );

        const label = screen.getByText(/test label/i);
        expect(label).toBeInTheDocument();

        const select = screen.getByRole("combobox");
        expect(select).toBeInTheDocument();
        expect(select).toBeEnabled();
        expect(selected).toBe(choco);

        fireEvent.change(select, { target: { value: berry } });
        expect(selected).toBe(berry);
    });
});
