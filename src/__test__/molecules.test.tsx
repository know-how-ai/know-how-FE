import { fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useThemeRenderWithRedux } from "@libs/jest-utils";
import { Input } from "@components/atoms";
import {
    FloatingButton,
    SelectWithLabel,
    TextboxWithLabel,
    ToggleButton,
} from "@components/molecules";

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

    test("FloatingButton", async () => {
        useThemeRenderWithRedux(<FloatingButton>Test Button</FloatingButton>);

        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
        expect(button).toBeEnabled();
        expect(button).toHaveTextContent(/test button/i);
    });

    test("ToggleButton", async () => {
        let state = true;

        useThemeRenderWithRedux(
            <ToggleButton
                statement={state}
                onClick={() => {
                    state = !state;
                }}
            />
        );

        const toggleBtn = await screen.findByTestId("toggle button");
        expect(toggleBtn).toBeInTheDocument();
        expect(toggleBtn).toBeEnabled();

        await user.click(toggleBtn);

        // unmount();

        // // re-render
        // useThemeRenderWithRedux(
        //     <ToggleButton
        //         statement={state}
        //         onClick={() => {
        //             state = !state;
        //         }}
        //     />
        // );

        expect(state).toBe(false);
    });
});
