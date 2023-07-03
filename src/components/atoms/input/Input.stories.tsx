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
        currentValue: "This is input atom.",
    },
};

export const Placeholder: InputStory = {
    args: {
        placeholder: "Placeholder by input",
    },
};

export const Disabled: InputStory = {
    args: {
        disabled: true,
        currentValue: "Not allowed type",
    },
};

export const Focused: InputStory = {
    args: {
        ...Base.args,
        isFocused: true,
    },
};
