import type { Meta, StoryObj } from "@storybook/react";
import TextboxWithLabel from "./TextboxWithLabel";

const meta = {
    component: TextboxWithLabel,
    tags: ["autodocs"],
} satisfies Meta<typeof TextboxWithLabel>;

export default meta;

type TextboxWithLabelStory = StoryObj<typeof TextboxWithLabel>;

export const Base: TextboxWithLabelStory = {
    args: {
        label: "Base",
    },
};

export const Disabled: TextboxWithLabelStory = {
    args: {
        label: "Disabled",
        disabled: true,
    },
};
