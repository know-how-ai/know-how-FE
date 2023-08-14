import { act, screen } from "@testing-library/react";
import mockRouter from "next-router-mock";
import { useThemeRenderWithRedux } from "@libs/jest-utils";
import userEvent from "@testing-library/user-event";
import Coverletter from "../pages/coverletter";

jest.mock("next/router", () => require("next-router-mock"));

describe("/coverletter 페이지 단위 테스트", () => {
    // const user = userEvent.setup();

    test("컴포넌트 단위 테스트: 레이아웃 컴포넌트", async () => {
        useThemeRenderWithRedux(<Coverletter />);

        await act(async () => {
            await mockRouter.push("/coverletter");
        });

        const themeToggleBtn = screen.getByTestId(/theme toggle button/i);
        expect(themeToggleBtn).toBeInTheDocument();
        expect(themeToggleBtn).toBeEnabled();

        const signBtn = screen.getByTestId(/sign button/i);
        expect(signBtn).toBeInTheDocument();
        expect(signBtn).toBeEnabled();
    });

    test("컴포넌트 단위 테스트: 페이지 내 컴포넌트", async () => {
        useThemeRenderWithRedux(<Coverletter />);

        await act(async () => {
            await mockRouter.push("/coverletter");
        });

        const submitBtn = screen.getByRole("button", { name: /제출+/ });
        expect(submitBtn).toBeInTheDocument();
        expect(submitBtn).toBeEnabled();

        const tooltipBtn = screen.getByText("?");
        expect(tooltipBtn).toBeInTheDocument();
        expect(tooltipBtn).toBeEnabled();

        const jobLabel = screen.getByText("직업");
        expect(jobLabel).toBeInTheDocument();
        expect(jobLabel).toBeEnabled();

        const jobInput = screen.getByPlaceholderText("Ex. 건축가", {
            exact: false,
        });
        expect(jobInput).toBeInTheDocument();
        expect(jobInput).toBeEnabled();

        const cvLabel = screen.getByText("자기소개서");
        expect(cvLabel).toBeInTheDocument();
        expect(cvLabel).toBeEnabled();

        const cvInput = screen.getByPlaceholderText("Ex. 저는", {
            exact: false,
        });
        expect(cvInput).toBeInTheDocument();
        expect(cvInput).toBeEnabled();
    });
});
