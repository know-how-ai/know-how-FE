import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useThemeRenderWithRedux } from "@libs/jest-utils";
import { Form, Input, Select } from "@components/atoms";
import { FloatingButton, LabelWrapper, LogTable } from "@components/molecules";
import { useForm } from "react-hook-form";
import { LoginOrJoinForm } from "@components/molecules";

jest.mock("next/router", () => require("next-router-mock"));

describe("Components: molecules unit test", () => {
    const user = userEvent.setup();

    test("LabelWrapper With Input", async () => {
        let value = "";

        const Component = () => {
            const { register, handleSubmit } = useForm<{ text: string }>();
            const onSubmit = ({ text }: { text: string }) => {
                value = text;
            };

            return (
                <Form display="flex" onSubmit={handleSubmit(onSubmit)}>
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
                <Form display="flex" onSubmit={handleSubmit(onSubmit)}>
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

    test("LoginOrJoinForm 메서드 토글", async () => {
        useThemeRenderWithRedux(
            <LoginOrJoinForm onError={jest.fn()} onSuccess={jest.fn()} />
        );

        const toggleBtn = screen.getByTestId(/toggle button/i);
        expect(toggleBtn).toBeInTheDocument();
        expect(toggleBtn).toBeEnabled();

        const emailLabel = screen.getByText("이메일");
        const passwordLabel = screen.getByText("패스워드");
        expect(emailLabel).toBeInTheDocument();
        expect(emailLabel).toBeEnabled();
        expect(passwordLabel).toBeInTheDocument();
        expect(passwordLabel).toBeEnabled();

        await user.click(toggleBtn);
        // total input is 6, but except the password & password confirmation inputs
        expect(screen.getAllByRole("textbox").length).toBe(4);
    });

    test("LoginOrJoinForm 타이핑 테스트", async () => {
        useThemeRenderWithRedux(
            <LoginOrJoinForm onError={jest.fn()} onSuccess={jest.fn()} />
        );

        const submitButton = screen.getByLabelText(
            /submitting form for login/i
        );
        expect(submitButton).toBeInTheDocument();
        expect(submitButton).toBeEnabled();

        const emailInput = screen.getByLabelText(/email input element for/i, {
            exact: false,
        });
        const passwordInput = screen.getByLabelText(
            /password input element for/i,
            {
                exact: false,
            }
        );
        expect(emailInput).toBeInTheDocument();
        expect(emailInput).toBeEnabled();
        expect(passwordInput).toBeInTheDocument();
        expect(passwordInput).toBeEnabled();

        await user.type(emailInput, "id@email.com");
        await user.type(passwordInput, "abcd");

        // need to timeout, cause fade in animation
        setTimeout(async () => {
            expect(
                await screen.findByDisplayValue("id@email.com")
            ).toBeVisible();
            expect(await screen.findByDisplayValue("abcd")).toBeVisible();
        }, 1000);
    });

    test("LogTable", async () => {
        const logs = [
            {
                created_at: Date.now() - 20000,
                comment: "logged in",
                amount: 10,
            },
            { created_at: Date.now() - 400000, comment: "apple", amount: -1 },
            { created_at: Date.now() - 6000000, comment: "apple", amount: -1 },
        ];

        useThemeRenderWithRedux(<LogTable logs={logs} />);

        const firstLog = screen.getByText(/초 전/, { exact: false });
        expect(firstLog).toBeInTheDocument();

        const secondLog = screen.getByText(/분 전/, { exact: false });
        expect(secondLog).toBeInTheDocument();
    });
});
