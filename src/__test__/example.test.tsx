import { render, screen } from "@testing-library/react";
import mockRouter from "next-router-mock";
import Example from "../pages/example";
import { Wrapper, useEvent } from "@libs/jest-utils";

jest.mock("next/router", () => require("next-router-mock"));

test("Jest 테스팅", async () => {
    await mockRouter.push("/test");

    render(<Example />, { wrapper: Wrapper });

    const container = screen.getByTestId("test-container");
    expect(container).toBeInTheDocument();
});
