import { screen } from "@testing-library/react";
import mockRouter from "next-router-mock";
import Example from "../pages/example";
import { useThemeRenderWithRedux } from "../libs/jest-utils";

jest.mock("next/router", () => require("next-router-mock"));

test("Jest 테스팅", async () => {
    // const user = userEvent.setup()
    await mockRouter.push("/example");

    useThemeRenderWithRedux(<Example />);

    const btns = await screen.findAllByRole("button");
    btns.forEach((input) => {
        expect(input).toBeInTheDocument();
    });
});
