import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useThemeRenderWithRedux } from "@libs/jest-utils";
import Layout from "../layout/Layout";
import { darkTheme, lightTheme } from "@components/styles/theme";

jest.mock("next/router", () => require("next-router-mock"));

describe("레이아웃 컴포넌트 유닛 테스트", () => {
    test("테마 토글 버튼", async () => {
        useThemeRenderWithRedux(<Layout title="test" />);

        const themeToggleBtn = screen.getByTestId(/theme toggle button/i);
        expect(themeToggleBtn).toBeInTheDocument();
        expect(themeToggleBtn).toBeEnabled();
    });

    test("로그인/프로필 버튼", async () => {
        useThemeRenderWithRedux(<Layout title="test" />);

        const signBtn = screen.getByTestId(/sign button/i);
        expect(signBtn).toBeInTheDocument();
        expect(signBtn).toBeEnabled();
    });

    test("헤딩", async () => {
        useThemeRenderWithRedux(<Layout title="test" />);

        const heading = screen.getByRole("heading");
        expect(heading).toBeInTheDocument();
        expect(heading).toBeEnabled();
    });

    test("푸터", async () => {
        useThemeRenderWithRedux(<Layout title="test" />);

        const copyright = screen.getByText(/copyright+/i);
        expect(copyright).toBeInTheDocument();
        expect(copyright).toBeEnabled();
    });
});

describe("레이아웃 컴포넌트 기능 테스트", () => {
    const user = userEvent.setup();

    test("테마 토글", async () => {
        useThemeRenderWithRedux(<Layout title="test" />);

        expect(screen.getByTestId(/theme toggle button/i)).toHaveStyle(
            `background-color: ${lightTheme.color.lightBlue}`
        );

        await user.click(screen.getByTestId(/theme toggle button/i));

        expect(screen.getByTestId(/theme toggle button/i)).toHaveStyle(
            `background-color: ${darkTheme.color.lightBlue}`
        );

        await user.click(screen.getByTestId(/theme toggle button/i));

        expect(screen.getByTestId(/theme toggle button/i)).toHaveStyle(
            `background-color: ${lightTheme.color.lightBlue}`
        );
    });

    test("로그인/프로파일 모달 온/오프: 클로즈 버튼", async () => {
        useThemeRenderWithRedux(<Layout title="test" />);

        expect(screen.getByTestId(/sign button/i)).toBeEnabled();
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
        expect(screen.queryByTestId(/close+/i)).not.toBeInTheDocument();

        await user.click(screen.getByTestId(/sign button/i));
        expect(screen.getByRole("dialog")).toBeInTheDocument();
        expect(screen.getByTestId(/close+/i)).toBeInTheDocument();

        await user.click(screen.getByTestId(/close+/i));
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
        expect(screen.queryByTestId(/close+/i)).not.toBeInTheDocument();
    });

    test("로그인/프로파일 모달 온/오프: Escape Key", async () => {
        useThemeRenderWithRedux(<Layout title="test" />);

        expect(screen.getByTestId(/sign button/i)).toBeEnabled();
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
        expect(screen.queryByTestId(/close+/i)).not.toBeInTheDocument();

        await user.click(screen.getByTestId(/sign button/i));
        expect(screen.getByRole("dialog")).toBeInTheDocument();
        expect(screen.getByTestId(/close+/i)).toBeInTheDocument();

        await user.keyboard("{Escape}");
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
        expect(screen.queryByTestId(/close+/i)).not.toBeInTheDocument();
    });
});
