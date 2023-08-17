import type { Meta, StoryObj } from "@storybook/react";
import CheckEmailForm from "./CheckEmailForm";

const meta = {
    component: CheckEmailForm,
    tags: ["autodocs"],
} satisfies Meta<typeof CheckEmailForm>;

export default meta;

type CheckEmailFormStory = StoryObj<typeof CheckEmailForm>;

export const Base: CheckEmailFormStory = {
    args: {},
};
