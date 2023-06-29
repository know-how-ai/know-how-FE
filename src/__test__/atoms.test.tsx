import { fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useThemeRenderWithRedux } from "@libs/jest-utils";
import { Input, Button, Select, Modal } from "@components/atoms";
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
});
