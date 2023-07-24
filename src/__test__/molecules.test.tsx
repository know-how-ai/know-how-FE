import { fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useThemeRenderWithRedux } from "@libs/jest-utils";
import { Form, Input } from "@components/atoms";
import {
    FloatingButton,
    SelectWithLabel,
    LabelWrapper,
    ToggleButton,
} from "@components/molecules";
import { useForm } from "react-hook-form";

jest.mock("next/router", () => require("next-router-mock"));

describe("Components: molecules unit test", () => {
    const user = userEvent.setup();

    test("LabelWrapper", async () => {
        let value = "";

        const Component = () => {
            const {
                register,
                handleSubmit,
                formState: { errors },
            } = useForm<{ text: string }>();
            const onSubmit = ({ text }: { text: string }) => {
                value = text;
            };

            return (
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <LabelWrapper label="test label">
                        <Input
                            type="text"
                            id="test"
                            register={register("text", {
                                minLength: {
                                    value: 2,
                                    message: "",
                                },
                            })}
                        />
                    </LabelWrapper>
                    <button>submit</button>
                </Form>
            );
        };

        useThemeRenderWithRedux(<Component />);

        const input = await screen.findByRole("textbox");
        const label = screen.getByText(/test label/i);
        const button = screen.getByText(/submit/i);

        expect(input).toBeInTheDocument();
        expect(label).toBeInTheDocument();
        expect(button).toBeInTheDocument();

        expect(input).toBeEnabled();
        expect(button).toBeEnabled();

        await user.type(input, "input testing");
        await user.click(button);
        expect(value).toBe("input testing");
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
