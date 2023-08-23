import { act, screen } from "@testing-library/react";
import mockRouter from "next-router-mock";
import { useThemeRenderWithRedux } from "@libs/jest-utils";
import userEvent from "@testing-library/user-event";
import Interview from "../../../pages/interview";

jest.mock("next/router", () => require("next-router-mock"));

describe("/interview 페이지 테스트", () => {
    // const user = userEvent.setup();

    test("컴포넌트 단위 테스트: 레이아웃 컴포넌트", async () => {
        useThemeRenderWithRedux(<Interview />);

        await act(async () => {
            await mockRouter.push("/interview");
        });

        const themeToggleBtn = screen.getByTestId(/theme toggle button/i);
        expect(themeToggleBtn).toBeInTheDocument();
        expect(themeToggleBtn).toBeEnabled();

        const signBtn = screen.getByTestId(/sign button/i);
        expect(signBtn).toBeInTheDocument();
        expect(signBtn).toBeEnabled();
    });

    test("컴포넌트 단위 테스트: 페이지 내 컴포넌트", async () => {
        useThemeRenderWithRedux(<Interview />);

        await act(async () => {
            await mockRouter.push("/interview");
        });

        const heading = screen.getByText("면접 코칭 봇");
        expect(heading).toBeInTheDocument();

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

        const domainLabel = screen.getByText("업계");
        expect(domainLabel).toBeInTheDocument();
        expect(domainLabel).toBeEnabled();

        const domainInput = screen.getByPlaceholderText("Ex. IT", {
            exact: false,
        });
        expect(domainInput).toBeInTheDocument();
        expect(domainInput).toBeEnabled();

        const projectLabel = screen.getByText("프로젝트명");
        expect(projectLabel).toBeInTheDocument();
        expect(projectLabel).toBeEnabled();

        const projectInput = screen.getByPlaceholderText("Ex. FW", {
            exact: false,
        });
        expect(projectInput).toBeInTheDocument();
        expect(projectInput).toBeEnabled();

        const skillLabel = screen.getByText("사용한 기술");
        expect(skillLabel).toBeInTheDocument();
        expect(skillLabel).toBeEnabled();

        const skillInput = screen.getByPlaceholderText("Ex. 드레이핑", {
            exact: false,
        });
        expect(skillInput).toBeInTheDocument();
        expect(skillInput).toBeEnabled();

        const featureLabel = screen.getByText("성과");
        expect(featureLabel).toBeInTheDocument();
        expect(featureLabel).toBeEnabled();

        const featureInput = screen.getByPlaceholderText("Ex. 브랜드", {
            exact: false,
        });
        expect(featureInput).toBeInTheDocument();
        expect(featureInput).toBeEnabled();

        const descriptionLabel = screen.getByText("간략한 설명");
        expect(descriptionLabel).toBeInTheDocument();
        expect(descriptionLabel).toBeEnabled();

        const descriptionInput = screen.getByPlaceholderText(
            "Ex. 이 프로젝트에서",
            {
                exact: false,
            }
        );
        expect(descriptionInput).toBeInTheDocument();
        expect(descriptionInput).toBeEnabled();
    });
});
