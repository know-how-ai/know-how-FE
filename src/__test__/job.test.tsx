import { screen } from "@testing-library/react";
import mockRouter from "next-router-mock";
import { useThemeRenderWithRedux } from "@libs/jest-utils";
import Job from "../pages/job";
import userEvent from "@testing-library/user-event";

jest.mock("next/router", () => require("next-router-mock"));

describe("/job 페이지 테스트", () => {
    // const user = userEvent.setup();

    test("컴포넌트 단위 테스트: 레이아웃 컴포넌트", async () => {
        await mockRouter.push("/interview");

        useThemeRenderWithRedux(<Job />);

        const themeToggleBtn = screen.getByTestId(/theme toggle button/i);
        expect(themeToggleBtn).toBeInTheDocument();
        expect(themeToggleBtn).toBeEnabled();

        const signBtn = screen.getByTestId(/sign button/i);
        expect(signBtn).toBeInTheDocument();
        expect(signBtn).toBeEnabled();
    });

    test("컴포넌트 단위 테스트: 페이지 내 컴포넌트", async () => {
        await mockRouter.push("/job");

        useThemeRenderWithRedux(<Job />);

        const addBtn = screen.getByText("추가");
        expect(addBtn).toBeInTheDocument();
        expect(addBtn).toBeEnabled();

        const recommendBtn = screen.getByText("추천", { exact: false });
        expect(recommendBtn).toBeInTheDocument();
        expect(recommendBtn).toBeEnabled();

        const tooltipBtn = screen.getByText("?");
        expect(tooltipBtn).toBeInTheDocument();
        expect(tooltipBtn).toBeEnabled();

        const personalityInput = screen.getByPlaceholderText("Ex. 끈기", {
            exact: false,
        });
        expect(personalityInput).toBeInTheDocument();
        expect(personalityInput).toBeEnabled();

        const personalityLabel = screen.getByText("나의 성향");
        expect(personalityLabel).toBeInTheDocument();
        expect(personalityLabel).toBeEnabled();
    });
});
