import { fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useThemeRenderWithRedux } from "@libs/jest-utils";
import { Input, Button, Select } from "@/components/Atoms";

jest.mock("next/router", () => require("next-router-mock"));

describe("Components: atoms unit test", () => {
    const user = userEvent.setup();

    test("Input", async () => {
        let inputVal = "";

        useThemeRenderWithRedux(
            <Input
                type="text"
                currentValue={inputVal}
                onChange={({ currentTarget: { value } }) => {
                    inputVal = value;
                }}
            />
        );

        const input = await screen.findByRole("textbox");
        expect(input).toBeInTheDocument();
        expect(input).toBeEnabled();

        // await user.type(input, "input testing");
        fireEvent.change(input, { target: { value: "input testing" } });
        expect(inputVal).toBe("input testing");

        await user.type(input, "a");
        expect(inputVal).toBe("a");
    });

    test("Button", async () => {
        useThemeRenderWithRedux(<Button>Test Button</Button>);

        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
        expect(button).toBeEnabled();
        expect(button).toHaveTextContent(/test button/i);
    });

    test("Select", async () => {
        const [choco, banana, berry] = ["choco", "banana", "berry"];
        let selected = choco;

        useThemeRenderWithRedux(
            <Select
                selectedValue={selected}
                options={[choco, banana, berry]}
                onChange={({ target: { value } }) => {
                    selected = value;
                }}
            />
        );

        const select = screen.getByRole("combobox");
        expect(select).toBeInTheDocument();
        expect(select).toBeEnabled();
        expect(selected).toBe(choco);

        fireEvent.change(select, { target: { value: berry } });
        expect(selected).toBe(berry);
    });
});
