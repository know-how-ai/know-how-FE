import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useThemeRenderWithRedux } from "@libs/jest-utils";
import { Form, Input, Select } from "@components/atoms";
import { FloatingButton, LabelWrapper } from "@components/molecules";
import { useForm } from "react-hook-form";

jest.mock("next/router", () => require("next-router-mock"));

describe("Components: molecules unit test", () => {
    const user = userEvent.setup();

    test("LabelWrapper With Input", async () => {
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

    test("LabelWrapper With Select", async () => {
        const [choco, banana, berry] = ["choco", "banana", "berry"];
        let value = "";

        const Component = () => {
            const {
                register,
                handleSubmit,
                formState: { errors },
            } = useForm<{ kind: string }>();
            const onSubmit = ({ kind }: { kind: string }) => {
                value = kind;
            };

            return (
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <LabelWrapper label="test label">
                        <Select
                            register={register("kind")}
                            options={[choco, banana, berry]}
                        />
                    </LabelWrapper>
                    <button>submit</button>
                </Form>
            );
        };

        useThemeRenderWithRedux(<Component />);

        const select = await screen.findByRole("combobox");
        const label = screen.getByText(/test label/i);
        const button = screen.getByText(/submit/i);

        expect(select).toBeInTheDocument();
        expect(label).toBeInTheDocument();
        expect(button).toBeInTheDocument();

        expect(select).toBeEnabled();
        expect(button).toBeEnabled();

        await user.click(select);
        await user.click(await screen.findByDisplayValue("choco"));
        await user.click(button);
        expect(value).toBe("choco");
    });

    test("FloatingButton", async () => {
        useThemeRenderWithRedux(<FloatingButton>Test Button</FloatingButton>);

        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
        expect(button).toBeEnabled();
        expect(button).toHaveTextContent(/test button/i);
    });
});
