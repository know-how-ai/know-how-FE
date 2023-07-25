import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useThemeRenderWithRedux } from "@libs/jest-utils";
import { LoginOrJoinForm } from "@components/organics";

jest.mock("next/router", () => require("next-router-mock"));

describe("Components: organics unit test", () => {
    const user = userEvent.setup();

    test("LoginOrJoinForm's Toggling method", async () => {
        useThemeRenderWithRedux(<LoginOrJoinForm />);

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
        // total input is 7, but except the password & password confirmation inputs
        expect(screen.getAllByRole("textbox").length).toBe(5);
    });

    test("LoginOrJoinForm's Typing Test", async () => {
        useThemeRenderWithRedux(<LoginOrJoinForm />);

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
        await user.click(submitButton);

        // need to timeout, cause fade in animation
        setTimeout(async () => {
            expect(
                await screen.findByDisplayValue("id@email.com")
            ).toBeVisible();
            expect(await screen.findByDisplayValue("abcd")).toBeVisible();
        }, 1000);
    });
});
