import { screen } from "@testing-library/react";
import mockRouter from "next-router-mock";
import Example from "../pages/example";
import { useThemeRenderWithRedux } from "@libs/jest-utils";
import userEvent from "@testing-library/user-event";

jest.mock("next/router", () => require("next-router-mock"));

test("Jest 테스팅", async () => {
    // const user = userEvent.setup()
    await mockRouter.push("/test");

    useThemeRenderWithRedux(<Example />);

    const inputs = await screen.findAllByRole("textbox");
    inputs.forEach((input) => {
        expect(input).toBeInTheDocument();
    });
});
