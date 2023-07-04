import type { Meta, StoryObj } from "@storybook/react";
import SelectWithLabel from "./SelectWithLabel";

const meta = {
    component: SelectWithLabel,
    tags: ["autodocs"],
} satisfies Meta<typeof SelectWithLabel>;

export default meta;

type SelectWithLabelStory = StoryObj<typeof SelectWithLabel>;

export const Base: SelectWithLabelStory = {
    args: {
        label: "Base",
        options: ["Chocolate", "Strawberry", "Banana", "Coffee"],
    },
};

export const Disabled: SelectWithLabelStory = {
    args: {
        ...Base.args,
        label: "Disabled",
        disabled: true,
    },
};
