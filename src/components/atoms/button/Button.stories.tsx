import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

const meta = {
    component: Button,
    tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;

type ButtonStory = StoryObj<typeof Button>;

export const Base: ButtonStory = {
    args: {
        children: "Base",
    },
};

export const Disabled: ButtonStory = {
    args: {
        ...Base.args,
        disabled: true,
    },
};
