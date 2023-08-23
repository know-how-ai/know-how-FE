import { act, screen } from "@testing-library/react";
import mockRouter from "next-router-mock";
import { useThemeRenderWithRedux } from "@libs/jest-utils";
import userEvent from "@testing-library/user-event";
import Home from "../../pages";

jest.mock("next/router", () => require("next-router-mock"));

describe("/ 페이지 테스트", () => {
    // const user = userEvent.setup();

    test("컴포넌트 단위 테스트: 레이아웃 컴포넌트", async () => {
        useThemeRenderWithRedux(<Home />);

        await act(async () => {
            await mockRouter.push("/");
        });

        const themeToggleBtn = screen.getByTestId(/theme toggle button/i);
        expect(themeToggleBtn).toBeInTheDocument();
        expect(themeToggleBtn).toBeEnabled();

        const signBtn = screen.getByTestId(/sign button/i);
        expect(signBtn).toBeInTheDocument();
        expect(signBtn).toBeEnabled();
    });

    test("컴포넌트 단위 테스트: 페이지 내 컴포넌트", async () => {
        useThemeRenderWithRedux(<Home />);

        await act(async () => {
            await mockRouter.push("/");
        });

        const coverletterBtn = screen.getByText("자소서", { exact: false });
        expect(coverletterBtn).toBeInTheDocument();
        expect(coverletterBtn).toBeEnabled();

        const interviewBtn = screen.getByText("면접", { exact: false });
        expect(interviewBtn).toBeInTheDocument();
        expect(interviewBtn).toBeEnabled();

        const jobBtn = screen.getByText("직업", { exact: false });
        expect(jobBtn).toBeInTheDocument();
        expect(jobBtn).toBeEnabled();
    });
});
