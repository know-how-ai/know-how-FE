import { screen } from "@testing-library/react";
import mockRouter from "next-router-mock";
import Example from "../pages/example";
import { useEvent, useThemeRenderWithRedux } from "@libs/jest-utils";

jest.mock("next/router", () => require("next-router-mock"));

test("Jest 테스팅", async () => {
    await mockRouter.push("/test");

    useThemeRenderWithRedux(<Example />);

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
});
