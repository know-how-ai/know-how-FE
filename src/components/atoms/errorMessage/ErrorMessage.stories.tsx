import type { Meta, StoryObj } from "@storybook/react";
import ErrorMessage from "./ErrorMessage";

const meta = {
    component: ErrorMessage,
    tags: ["autodocs"],
} satisfies Meta<typeof ErrorMessage>;

export default meta;

type ErrorMessageStory = StoryObj<typeof ErrorMessage>;

export const Base: ErrorMessageStory = {
    args: {
        children: "Base ErrorMessage",
    },
};
