import type { Meta, StoryObj } from "@storybook/react";
import LoginOrJoinForm from "./LoginOrJoinForm";

const meta = {
    component: LoginOrJoinForm,
    tags: ["autodocs"],
} satisfies Meta<typeof LoginOrJoinForm>;

export default meta;

type LoginOrJoinFormStory = StoryObj<typeof LoginOrJoinForm>;

export const Base: LoginOrJoinFormStory = {
    args: {},
};
