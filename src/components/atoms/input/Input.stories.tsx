import type { Meta, StoryObj } from "@storybook/react";
import Input from "./Input";

const meta = {
    component: Input,
    tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;

type InputStory = StoryObj<typeof Input>;

export const Base: InputStory = {
    args: {
        label: "Base",
    },
};

export const Placeholder: InputStory = {
    args: {
        label: "Placeholder",
        placeholder: "Base Input with label",
    },
};

export const Disabled: InputStory = {
    args: {
        label: "Disabled",
        disabled: true,
        currentValue: "Not allowed type",
    },
};

// input, lable => input with label (input + label)
