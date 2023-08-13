import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useThemeRenderWithRedux } from "@libs/jest-utils";
import { AuthModal, ProfileModal } from "@components/organics";

jest.mock("next/router", () => require("next-router-mock"));

describe("Components: molecules unit test", () => {
    const user = userEvent.setup();

    test("AuthModal's Toggling method", async () => {
        useThemeRenderWithRedux(
            <AuthModal
                handleClose={() => {}}
                onError={() => {}}
                onSuccess={() => {}}
            />
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

    test("AuthModal's Typing Test", async () => {
        useThemeRenderWithRedux(
            <AuthModal
                handleClose={() => {}}
                onError={() => {}}
                onSuccess={() => {}}
            />
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
        await user.click(submitButton);

        // need to timeout, cause fade in animation
        setTimeout(async () => {
            expect(
                await screen.findByDisplayValue("id@email.com")
            ).toBeVisible();
            expect(await screen.findByDisplayValue("abcd")).toBeVisible();
        }, 1000);
    });

    test("ProfileModal", async () => {
        const logs = [
            { createdAt: Date.now() - 20000, comment: "logged in", amount: 10 },
            { createdAt: Date.now() - 400000, comment: "apple", amount: -1 },
            { createdAt: Date.now() - 6000000, comment: "apple", amount: -1 },
        ];

        const [point, username] = [10, "username"];

        useThemeRenderWithRedux(
            <ProfileModal
                point={point}
                username={username}
                handleClose={() => {}}
                handleLogout={() => {}}
                logs={logs}
            />
        );

        const foundUser = screen.getByText(/님 반가워요/i, { exact: false });
        expect(foundUser).toBeInTheDocument();

        const foundPoint = screen.getByText(/잔여 포인트/i, { exact: false });
        expect(foundPoint).toBeInTheDocument();

        const firstLog = screen.getByText(/초 전/, { exact: false });
        expect(firstLog).toBeInTheDocument();

        const secondLog = screen.getByText(/분 전/, { exact: false });
        expect(secondLog).toBeInTheDocument();
    });
});