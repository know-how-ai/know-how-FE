import { fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useThemeRenderWithRedux } from "@libs/jest-utils";
import mockRouter from "next-router-mock";
import {
    Input,
    Button,
    Modal,
    Select,
    Label,
    Badge,
    ErrorMessage,
    Anchor,
    Toast,
    Form,
    ToggleButton,
    Table,
    Textarea,
    ToolTip,
    Logo,
} from "@components/atoms";
import { useForm } from "react-hook-form";

jest.mock("next/router", () => require("next-router-mock"));

describe("Components: atoms unit test", () => {
    const user = userEvent.setup();

    test("Textarea with Label, Form, ErrorMessage", async () => {
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
                <Form display="flex" onSubmit={handleSubmit(onSubmit)}>
                    <Label>label test</Label>
                    <Textarea
                        type="text"
                        id="test"
                        register={register("text", {
                            minLength: {
                                value: 2,
                                message: "",
                            },
                        })}
                    />
                    {errors.text ? (
                        <ErrorMessage>Ocurring Error</ErrorMessage>
                    ) : null}

                    <button>submit</button>
                </Form>
            );
        };

        const { unmount } = useThemeRenderWithRedux(<Component />);

        const textarea = await screen.findByRole("textbox");
        const label = await screen.findByText(/label test/i);
        const button = await screen.findByText(/submit/i);
        const errorMessage = screen.queryByText(/ocurring error/i);

        expect(textarea).toBeInTheDocument();
        expect(label).toBeInTheDocument();
        expect(button).toBeInTheDocument();
        expect(errorMessage).not.toBeInTheDocument();

        expect(textarea).toBeEnabled();
        expect(button).toBeEnabled();

        await user.type(textarea, "input testing");
        await user.click(button);
        expect(value).toBe("input testing");

        // re-rendering
        unmount();
        useThemeRenderWithRedux(<Component />);

        await user.type(await screen.findByRole("textbox"), "1");
        await user.click(await screen.findByText(/submit/i));
        expect(screen.getByText(/ocurring error/i)).toBeInTheDocument();

        await user.type(await screen.findByRole("textbox"), "1234");
        await user.click(await screen.findByText(/submit/i));
        expect(screen.queryByText(/ocurring error/i)).not.toBeInTheDocument();
    });

    test("Input with Label, Form, ErrorMessage", async () => {
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
                <Form display="flex" onSubmit={handleSubmit(onSubmit)}>
                    <Label>label test</Label>
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
                    {errors.text ? (
                        <ErrorMessage>Ocurring Error</ErrorMessage>
                    ) : null}

                    <button>submit</button>
                </Form>
            );
        };

        const { unmount } = useThemeRenderWithRedux(<Component />);

        const input = await screen.findByRole("textbox");
        const label = await screen.findByText(/label test/i);
        const button = await screen.findByText(/submit/i);
        const errorMessage = screen.queryByText(/ocurring error/i);

        expect(input).toBeInTheDocument();
        expect(label).toBeInTheDocument();
        expect(button).toBeInTheDocument();
        expect(errorMessage).not.toBeInTheDocument();

        expect(input).toBeEnabled();
        expect(button).toBeEnabled();

        await user.type(input, "input testing");
        await user.click(button);
        expect(value).toBe("input testing");

        // re-rendering
        unmount();
        useThemeRenderWithRedux(<Component />);

        await user.type(await screen.findByRole("textbox"), "1");
        await user.click(await screen.findByText(/submit/i));
        expect(screen.getByText(/ocurring error/i)).toBeInTheDocument();

        await user.type(await screen.findByRole("textbox"), "1234");
        await user.click(await screen.findByText(/submit/i));
        expect(screen.queryByText(/ocurring error/i)).not.toBeInTheDocument();
    });

    test("Badge", async () => {
        useThemeRenderWithRedux(<Badge>Test Button</Badge>);

        const badge = screen.getByText(/test button/i);
        expect(badge).toBeInTheDocument();
        expect(badge).toBeEnabled();
        expect(badge).toHaveTextContent(/test button/i);
    });

    test("Anchor", async () => {
        await mockRouter.push("/");

        const targetUrl = "/example";

        useThemeRenderWithRedux(<Anchor href={targetUrl}>Test Anchor</Anchor>);

        const anchor = screen.getByRole("link");

        anchor.addEventListener("click", (e) => {
            e.preventDefault();
            mockRouter.push(targetUrl);
        });

        expect(anchor).toBeInTheDocument();
        expect(anchor).toBeEnabled();
        expect(anchor).toHaveTextContent(/test anchor/i);
        expect(mockRouter.pathname).toBe("/");

        // await user.click(anchor);
        await user.click(anchor);

        expect(mockRouter.pathname).not.toBe("/");
    });

    test("Button", async () => {
        useThemeRenderWithRedux(<Button>Test Button</Button>);

        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
        expect(button).toBeEnabled();
        expect(button).toHaveTextContent(/test button/i);
    });

    test("Form", async () => {
        useThemeRenderWithRedux(
            <Form display="flex">
                <input type="text" placeholder="test input for form" />
            </Form>
        );

        const form = await screen.findByTestId("form");
        expect(form).toBeInTheDocument();
        expect(form).toBeEnabled();
    });

    test("Logo", () => {
        useThemeRenderWithRedux(<Logo href="#">test logo</Logo>);

        const logoContainer = screen.getByTestId("logo");
        expect(logoContainer).toBeInTheDocument();
        expect(logoContainer).toBeEnabled();

        const anchor = screen.getByRole("link");
        expect(anchor).toBeInTheDocument();
        expect(anchor).toBeEnabled();
    });

    test("Select", () => {
        const [choco, banana, berry] = ["choco", "banana", "berry"];
        let selected = choco;

        useThemeRenderWithRedux(
            <Select
                options={[choco, banana, berry]}
                // @ts-ignore
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

    test("Modal", async () => {
        let showModal = false;

        const ModalComponent = () => {
            const showingModal = () => {
                showModal = true;
            };
            const hideModal = () => {
                showModal = false;
            };

            return (
                <>
                    <Button onClick={showingModal}>Modal On</Button>

                    {showModal ? (
                        <Modal handleClose={hideModal}>
                            <Button onClick={hideModal}>Modal Off</Button>
                        </Modal>
                    ) : null}
                </>
            );
        };

        const { unmount } = useThemeRenderWithRedux(<ModalComponent />);

        const onModalButton = screen.getByRole("button", {
            name: /modal on/i,
        });

        expect(onModalButton).toBeInTheDocument();
        expect(screen.queryByTestId(/modal/i)).not.toBeInTheDocument();

        // show modal
        await user.click(onModalButton);

        // re-rendering
        unmount();
        const { unmount: unmount2 } = useThemeRenderWithRedux(
            <ModalComponent />
        );
        expect(showModal).toBe(true);
        expect(screen.getByTestId(/modal/i)).toBeInTheDocument();

        const offModalButton = screen.getByRole("button", {
            name: /modal off/i,
        });

        // hide modal
        await user.click(offModalButton);

        // re-rendering
        unmount2();
        useThemeRenderWithRedux(<ModalComponent />);
        expect(showModal).toBe(false);
        expect(screen.queryByTestId(/modal/i)).not.toBeInTheDocument();
    });

    test("Toast", async () => {
        let showing = false;
        const timer = 3000;

        const ToastComponent = () => {
            const showToast = () => {
                showing = true;
            };
            const hideToast = () => {
                showing = false;
            };

            return (
                <>
                    <Button onClick={showToast}>Toast On</Button>

                    {showing ? (
                        <Toast
                            isShow={showing}
                            duration={timer}
                            handleClose={hideToast}
                        >
                            Baaam
                        </Toast>
                    ) : null}
                </>
            );
        };

        const { unmount } = useThemeRenderWithRedux(<ToastComponent />);

        const onModalButton = screen.getByRole("button", {
            name: /toast on/i,
        });

        expect(onModalButton).toBeInTheDocument();
        expect(screen.queryByTestId(/toast/i)).not.toBeInTheDocument();

        // show toast
        await user.click(onModalButton);

        // re-rendering
        unmount();
        useThemeRenderWithRedux(<ToastComponent />);
        expect(showing).toBe(true);
        expect(screen.getByTestId(/toast/i)).toBeInTheDocument();

        setTimeout(() => {
            expect(screen.queryByTestId(/toast/i)).not.toBeInTheDocument();
        }, timer + 100);
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

        expect(state).toBe(false);
    });

    test("ToolTip", async () => {
        const contents: string[] = ["테스트 툴팁이 나타났어요."];

        useThemeRenderWithRedux(
            <>
                <ToolTip contents={contents} />
                <div>other element</div>
            </>
        );

        // 툴팁 버튼의 존재 유무
        const toolTipBtn = screen.getByText("?");
        expect(toolTipBtn).toBeInTheDocument();
        expect(toolTipBtn).toBeEnabled();

        // 툴팁 버튼 호버 이벤트 발생
        await user.hover(toolTipBtn);

        // 툴팁 박스 표시 체크
        const toolTipBox = screen.getByText("테스트", { exact: false });
        expect(toolTipBox).toBeInTheDocument();
        expect(toolTipBox).toBeEnabled();

        // 다른 엘리먼트 클릭 이벤트 발생
        const otherElem = screen.getByText(/other/, { exact: false });
        await user.click(otherElem);

        // 툴팁 박스 사라짐 체크
        expect(
            screen.queryByText("테스트", { exact: false })
        ).not.toBeInTheDocument();
    });

    test("Table", () => {
        const titleRow = ["name", "kind", "price"];
        const contentRows = [
            ["apple", "fruit", "4000"],
            ["banana", "fruit", "5000"],
            ["chocolate", "snack", "2000"],
        ];

        useThemeRenderWithRedux(
            <Table titleRow={titleRow} contentRows={contentRows} />
        );

        const table = screen.getByRole("table");
        expect(table).toBeInTheDocument();

        contentRows.map((row) => {
            const item = screen.getByText(row[0]);
            expect(item).toBeInTheDocument();
        });
    });
});
