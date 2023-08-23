import { act, screen } from "@testing-library/react";
import mockRouter from "next-router-mock";
import { useThemeRenderWithRedux } from "@libs/jest-utils";
import userEvent from "@testing-library/user-event";
import Reset from "../../pages/reset";

jest.mock("next/router", () => require("next-router-mock"));

describe("/reset 페이지 테스트", () => {
    // const user = userEvent.setup();
    const url = "/reset?email=id@example.com&resetQuestion=what_is_answer?";

    test("컴포넌트 단위 테스트: 레이아웃 컴포넌트", async () => {
        useThemeRenderWithRedux(<Reset />);

        await act(async () => {
            await mockRouter.push(url);
        });

        const themeToggleBtn = screen.getByTestId(/theme toggle button/i);
        expect(themeToggleBtn).toBeInTheDocument();
        expect(themeToggleBtn).toBeEnabled();

        const signBtn = screen.queryByTestId(/sign button/i);
        expect(signBtn).not.toBeInTheDocument();
    });

    test("컴포넌트 단위 테스트: 페이지 내 컴포넌트", async () => {
        useThemeRenderWithRedux(<Reset />);

        await act(async () => {
            await mockRouter.push(url);
        });

        const emailInput = screen.getByDisplayValue("id@example.com");
        expect(emailInput).toBeInTheDocument();
        expect(emailInput).toBeDisabled();

        const resetQuestionInput = screen.getByDisplayValue("what_is_answer?");
        expect(resetQuestionInput).toBeInTheDocument();
        expect(resetQuestionInput).toBeDisabled();

        const inputs = screen.getAllByRole("textbox");
        expect(inputs.length).toBe(3);

        const submitBtn = screen.getByRole("button", { name: "변경하기" });
        expect(submitBtn).toBeInTheDocument();
        expect(submitBtn).toBeEnabled();
    });
});
