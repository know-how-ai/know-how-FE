import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useThemeRenderWithRedux } from "@libs/jest-utils";
import {
    AuthModal,
    HeaderWidgets,
    ProfileModal,
    ResultContainer,
} from "@components/organics";

jest.mock("next/router", () => require("next-router-mock"));

describe("Components: Organics unit test", () => {
    const user = userEvent.setup();

    function mockFetch(data: any) {
        return jest.fn().mockImplementation(() =>
            Promise.resolve({
                status: true,
                json: () => data,
            })
        );
    }

    window.fetch = mockFetch({});

    test("AuthModal: isResetMode 토글", async () => {
        useThemeRenderWithRedux(
            <AuthModal
                handleClose={jest.fn()}
                onError={jest.fn()}
                onSuccessJoin={jest.fn()}
                onSuccessFound={jest.fn()}
            />
        );

        const emailLabel = screen.getByText("이메일");
        const passwordLabel = screen.getByText("패스워드");
        expect(emailLabel).toBeInTheDocument();
        expect(passwordLabel).toBeInTheDocument();

        const resetBtn = screen.getByText("비밀번호를 잊으셨나요?");
        expect(resetBtn).toBeInTheDocument();
        expect(resetBtn).toBeEnabled();

        await user.click(resetBtn);
        expect(screen.getByText("이메일")).toBeInTheDocument();
        expect(screen.queryByText("패스워드")).not.toBeInTheDocument();
    });

    test("AuthModal: Login/Join 메서드 토글", async () => {
        useThemeRenderWithRedux(
            <AuthModal
                handleClose={jest.fn()}
                onError={jest.fn()}
                onSuccessJoin={jest.fn()}
                onSuccessFound={jest.fn()}
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

    test("AuthModal: 컴포넌트 입력 테스트", async () => {
        useThemeRenderWithRedux(
            <AuthModal
                handleClose={jest.fn()}
                onError={jest.fn()}
                onSuccessJoin={jest.fn()}
                onSuccessFound={jest.fn()}
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

        // need to timeout, cause fade in animation
        setTimeout(async () => {
            expect(
                await screen.findByDisplayValue("id@email.com")
            ).toBeVisible();
            expect(await screen.findByDisplayValue("abcd")).toBeVisible();
        }, 1000);
    });

    test("ProfileModal: 컴포넌트 유닛 테스트", async () => {
        const [point, username] = [10, "username"];

        useThemeRenderWithRedux(
            <ProfileModal
                point={point}
                username={username}
                handleClose={jest.fn()}
                handleLogout={jest.fn()}
            />
        );

        const foundUser = screen.getByText(/님 반가워요/i, { exact: false });
        expect(foundUser).toBeInTheDocument();

        const foundPoint = screen.getByText(/잔여 포인트/i, { exact: false });
        expect(foundPoint).toBeInTheDocument();
    });

    test("HeaderWidgets: 컴포넌트 유닛 테스트", async () => {
        useThemeRenderWithRedux(<HeaderWidgets themeWidget profileWidget />);

        const themeBtn = screen.getByTestId(/theme toggle button/i);
        expect(themeBtn).toBeInTheDocument();
        expect(themeBtn).toBeEnabled();

        const signBtn = screen.getByTestId(/sign button/i);
        expect(signBtn).toBeInTheDocument();
        expect(signBtn).toBeEnabled();
    });

    test("ResultContainer: 컴포넌트 유닛 테스트", async () => {
        useThemeRenderWithRedux(<ResultContainer></ResultContainer>);

        const againBtn = screen.getByRole("button", { name: "다시하기" });
        expect(againBtn).toBeInTheDocument();
        expect(againBtn).toBeEnabled();

        const homeBtn = screen.getByRole("button", { name: "메인으로" });
        expect(homeBtn).toBeInTheDocument();
        expect(homeBtn).toBeEnabled();
    });
});
