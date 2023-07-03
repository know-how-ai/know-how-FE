import type { Meta, StoryObj } from "@storybook/react";
import Label from "./Label";

const meta = {
    component: Label,
    tags: ["autodocs"],
} satisfies Meta<typeof Label>;

export default meta;

type LabelStory = StoryObj<typeof Label>;

export const Base: LabelStory = {
    args: {
        children: "Base LabelSpan",
    },
};

export const Disabled: LabelStory = {
    args: {
        children: "Disabled LabelSpan",
        disabled: true,
    },
};
