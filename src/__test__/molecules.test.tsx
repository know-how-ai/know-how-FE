import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useThemeRenderWithRedux } from "@libs/jest-utils";
import { Form, Input, Select, SunIcon } from "@components/atoms";
import {
    CheckEmailForm,
    LabelWrapper,
    LogTable,
    MainListItem,
    ProfileWidget,
    ThemeWidget,
} from "@components/molecules";
import { useForm } from "react-hook-form";
import { LoginOrJoinForm } from "@components/molecules";

jest.mock("next/router", () => require("next-router-mock"));

describe("molecules 컴포넌트 유닛 테스트", () => {
    test("LabelWrapper With Input", async () => {
        useThemeRenderWithRedux(
            <LabelWrapper label="test label">
                <Input type="text" id="test" />
            </LabelWrapper>
        );

        const input = await screen.findByRole("textbox");
        const label = screen.getByText(/test label/i);

        expect(input).toBeInTheDocument();
        expect(label).toBeInTheDocument();

        expect(input).toBeEnabled();
        expect(label).toBeEnabled();
    });

    test("LabelWrapper With Select", async () => {
        const [choco, banana, berry] = ["choco", "banana", "berry"];

        useThemeRenderWithRedux(
            <LabelWrapper label="test label">
                <Select options={[choco, banana, berry]} />
            </LabelWrapper>
        );

        const select = await screen.findByRole("combobox");
        const label = screen.getByText(/test label/i);

        expect(select).toBeInTheDocument();
        expect(label).toBeInTheDocument();

        expect(select).toBeEnabled();
        expect(label).toBeEnabled();
    });

    test("LoginOrJoinForm", async () => {
        useThemeRenderWithRedux(
            <LoginOrJoinForm onError={jest.fn} onSuccess={jest.fn} />
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

        const submitButton = screen.getByLabelText(
            /submitting form for login/i
        );
        expect(submitButton).toBeInTheDocument();
        expect(submitButton).toBeEnabled();
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

    test("CheckEmailForm", async () => {
        useThemeRenderWithRedux(
            <CheckEmailForm onError={jest.fn} onSuccess={jest.fn} />
        );

        const heading = screen.getByRole("heading");
        const form = screen.getByRole("form");
        const label = screen.getByText("이메일");
        const input = screen.getByRole("textbox");
        const button = screen.getByText("확인하기");

        expect(heading).toBeInTheDocument();
        expect(form).toBeInTheDocument();
        expect(label).toBeInTheDocument();
        expect(input).toBeInTheDocument();
        expect(button).toBeInTheDocument();

        expect(heading).toBeEnabled();
        expect(form).toBeEnabled();
        expect(label).toBeEnabled();
        expect(input).toBeEnabled();
        expect(button).toBeEnabled();
    });

    test("MainListItem", async () => {
        useThemeRenderWithRedux(
            <MainListItem isDarkmode Child={SunIcon} heading="Test" href="#" />
        );

        const heading = screen.getByText(/test/i);
        const button = screen.getByRole("button");
        const anchor = screen.getByRole("link");

        expect(heading).toBeInTheDocument();
        expect(button).toBeInTheDocument();
        expect(anchor).toBeInTheDocument();

        expect(heading).toBeEnabled();
        expect(button).toBeEnabled();
        expect(anchor).toBeEnabled();
    });

    test("ProfileWidget", async () => {
        useThemeRenderWithRedux(<ProfileWidget onModal={jest.fn} />);

        const button = screen.getByRole("button");

        expect(button).toBeInTheDocument();
        expect(button).toBeEnabled();
    });

    test("ThemeWidget", async () => {
        useThemeRenderWithRedux(
            <ThemeWidget isDarkmode toggleThemeMode={jest.fn} />
        );

        const button = screen.getByRole("button");

        expect(button).toBeInTheDocument();
        expect(button).toBeEnabled();
    });
});

describe("molecules 컴포넌트 기능 테스트", () => {
    const user = userEvent.setup();

    test("LoginOrJoinForm: 메서드 토글", async () => {
        useThemeRenderWithRedux(
            <LoginOrJoinForm onError={jest.fn} onSuccess={jest.fn} />
        );

        const toggleBtn = screen.getByTestId(/toggle button/i);
        expect(toggleBtn).toBeEnabled();

        const emailLabel = screen.getByText("이메일");
        const passwordLabel = screen.getByText("패스워드");
        expect(emailLabel).toBeEnabled();
        expect(passwordLabel).toBeEnabled();

        await user.click(toggleBtn);
        // total input is 6, but except the password & password confirmation inputs
        expect(screen.getAllByRole("textbox").length).toBe(4);
    });

    test("LoginOrJoinForm: 타이핑 테스트", async () => {
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

    test("LabelWrapper With Input: 타이핑 테스트(레이블)", async () => {
        useThemeRenderWithRedux(
            <LabelWrapper label="test label">
                <Input type="text" id="test" />
            </LabelWrapper>
        );

        const input = await screen.findByRole("textbox");
        const label = screen.getByText(/test label/i);

        expect(input).toBeEnabled();
        expect(label).toBeEnabled();

        await user.click(label);
        await user.keyboard("a");
        expect(input).toHaveDisplayValue("a");
    });

    test("LabelWrapper With Input: 타이핑 테스트(인풋)", async () => {
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
        const button = screen.getByText(/submit/i);

        expect(input).toBeEnabled();
        expect(button).toBeEnabled();

        await user.type(input, "abc");
        await user.click(button);
        expect(value).toBe("abc");
    });

    test("LabelWrapper With Select: 셀렉트 테스트(셀렉트)", async () => {
        const [choco, banana, berry] = ["choco", "banana", "berry"];
        let value = "";

        const Component = () => {
            const { register, handleSubmit } = useForm<{ kind: string }>();
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

        expect(select).toBeEnabled();
        expect(button).toBeEnabled();
        expect(label).toBeEnabled();

        await user.click(select);
        await user.click(await screen.findByDisplayValue("choco"));
        await user.click(button);

        expect(value).toBe("choco");
    });

    test("LabelWrapper With Select: 셀렉트 테스트(레이블)", async () => {
        const [choco, banana, berry] = ["choco", "banana", "berry"];
        let value = "";

        const Component = () => {
            const { register, handleSubmit } = useForm<{ kind: string }>();
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

        expect(select).toBeEnabled();
        expect(button).toBeEnabled();
        expect(label).toBeEnabled();

        await user.click(label);
        await user.click(await screen.findByDisplayValue("choco"));
        await user.click(button);

        expect(value).toBe("choco");
    });

    test("CheckEmailForm: 타이핑 테스트(인풋)", async () => {
        useThemeRenderWithRedux(
            <CheckEmailForm onError={jest.fn} onSuccess={jest.fn} />
        );

        const label = screen.getByText("이메일");
        const input = screen.getByRole("textbox");

        await user.type(input, "test text");

        expect(input).toHaveDisplayValue("test text");
    });

    test("CheckEmailForm: 타이핑 테스트(레이블)", async () => {
        useThemeRenderWithRedux(
            <CheckEmailForm onError={jest.fn} onSuccess={jest.fn} />
        );

        const label = screen.getByText("이메일");
        const input = screen.getByRole("textbox");

        await user.click(label);
        await user.keyboard("a");

        expect(input).toHaveDisplayValue("a");
    });

    test("ThemeWidget: 테마 토글", async () => {
        let current = false;

        useThemeRenderWithRedux(
            <ThemeWidget
                isDarkmode={current}
                toggleThemeMode={() => {
                    current = !current;
                }}
            />
        );

        const button = screen.getByRole("button");

        await user.click(button);
        expect(current).toBe(true);

        await user.click(button);
        expect(current).toBe(false);
    });
});
