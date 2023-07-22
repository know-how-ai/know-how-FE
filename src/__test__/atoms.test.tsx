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
    Editor,
    DraftViewer,
    Form,
} from "@components/atoms";
import { getDraftByHtml } from "@libs/editor";

jest.mock("next/router", () => require("next-router-mock"));

describe("Components: atoms unit test", () => {
    const user = userEvent.setup();

    test("DraftViewer", async () => {
        const htmlVal = "<p>test editing is inputted.</p>";
        const draftVal = getDraftByHtml(htmlVal);

        useThemeRenderWithRedux(<DraftViewer draft={draftVal} />);

        const draft = await screen.findByText("test editing", { exact: false });
        expect(draft).toBeInTheDocument();
        expect(draft).toBeVisible();
    });

    test("Editor", async () => {
        let editorVal = "test editing is inputted.";

        useThemeRenderWithRedux(<Editor defaultState={editorVal} />);

        const editorContainer = await screen.findByTestId("editor");
        expect(editorContainer).toBeInTheDocument();
        expect(editorContainer).toBeEnabled();

        const editing = await screen.findByText("test", { exact: false });
        expect(editing).toBeInTheDocument();
        expect(editing).toBeVisible();
    });

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

    test("Label with Input", async () => {
        let inputVal = "";

        useThemeRenderWithRedux(
            <>
                <Label>label test</Label>
                <Input
                    currentValue={inputVal}
                    type="text"
                    id="test"
                    onChange={({ currentTarget: { value } }) => {
                        inputVal = value;
                    }}
                />
            </>
        );

        const input = await screen.findByRole("textbox");
        const label = await screen.findByText(/label test/i);
        expect(input).toBeInTheDocument();
        expect(label).toBeInTheDocument();
        expect(input).toBeEnabled();

        // await user.type(input, "input testing");
        fireEvent.change(input, { target: { value: "input testing" } });
        expect(inputVal).toBe("input testing");

        await user.click(input);
        await user.keyboard("a");

        expect(inputVal).toBe("a");
    });

    test("ErrorMessage with Input", async () => {
        let [inputVal, errStatus] = ["", false];
        const ErrorComponent = () => {
            return (
                <>
                    <Input
                        currentValue={inputVal}
                        type="text"
                        id="test"
                        onChange={({ currentTarget: { value } }) => {
                            inputVal = value;
                            errStatus = !!inputVal.match(/error/i);
                        }}
                    />

                    {errStatus ? (
                        <ErrorMessage>Ocurring Error</ErrorMessage>
                    ) : null}
                </>
            );
        };

        const { unmount: unmount1 } = useThemeRenderWithRedux(
            <ErrorComponent />
        );

        const input1 = await screen.findByRole("textbox");
        const errMessage = screen.queryByText(/ocurring error/i);
        expect(input1).toBeInTheDocument();
        expect(input1).toBeEnabled();
        expect(errMessage).not.toBeInTheDocument();

        // await user.type(input, "input testing");
        fireEvent.change(input1, { target: { value: "error testing" } });
        expect(inputVal).toBe("error testing");
        expect(errStatus).toBe(true);

        // re-rendering
        unmount1();
        const { unmount: unmount2 } = useThemeRenderWithRedux(
            <ErrorComponent />
        );

        expect(screen.getByText(/ocurring error/i)).toBeInTheDocument();

        const input2 = await screen.findByRole("textbox");
        fireEvent.change(input2, { target: { value: "a" } });
        expect(inputVal).toBe("a");
        expect(errStatus).toBe(false);

        // re-rendering
        unmount2();
        useThemeRenderWithRedux(<ErrorComponent />);

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
            <Form>
                <input type="text" placeholder="test input for form" />
            </Form>
        );

        const form = await screen.findByTestId("form");
        expect(form).toBeInTheDocument();
        expect(form).toBeEnabled();
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
});
