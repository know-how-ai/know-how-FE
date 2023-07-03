import type { Meta, StoryObj } from "@storybook/react";
import LabelSpan from "./Labelspan";

const meta = {
    component: LabelSpan,
    tags: ["autodocs"],
} satisfies Meta<typeof LabelSpan>;

export default meta;

type LabelSpanStory = StoryObj<typeof LabelSpan>;

export const Base: LabelSpanStory = {
    args: {
        children: "Base LabelSpan",
    },
};

export const Disabled: LabelSpanStory = {
    args: {
        children: "Disabled LabelSpan",
        disabled: true,
    },
};
