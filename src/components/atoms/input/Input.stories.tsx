import type { Meta, StoryObj } from "@storybook/react";
import Input from "./Input";
import { LabelWrapper } from "@components/molecules";

const meta = {
    component: Input,
    tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;

type InputStory = StoryObj<typeof Input>;

export const TextType: InputStory = {
    args: {
        placeholder: "Base",
        type: "text",
    },
    decorators: [(story) => <LabelWrapper>{story()}</LabelWrapper>],
};

export const PasswordType: InputStory = {
    ...TextType,
    args: {
        placeholder: "Password",
        type: "password",
    },
};

export const EmailType: InputStory = {
    ...TextType,
    args: {
        placeholder: "Email",
        type: "email",
    },
};
