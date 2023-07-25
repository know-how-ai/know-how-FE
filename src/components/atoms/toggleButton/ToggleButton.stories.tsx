import type { Meta, StoryObj } from "@storybook/react";
import ToggleButton from "./ToggleButton";

const meta = {
    component: ToggleButton,
    tags: ["autodocs"],
} satisfies Meta<typeof ToggleButton>;

export default meta;

type ToggleButtonStory = StoryObj<typeof ToggleButton>;

export const Single: ToggleButtonStory = {
    args: {
        variant: "single",
        statement: true,
        ariaLabel: "Login or Join toggle Button",
        ariaDescription: `Current method is Single.`,
    },
};

export const SingleNotSelected: ToggleButtonStory = {
    args: {
        ...Single.args,
        statement: false,
    },
};

export const Dual: ToggleButtonStory = {
    args: {
        variant: "dual",
        statement: true,
    },
};

export const DualOtherValue: ToggleButtonStory = {
    args: {
        ...Dual.args,
        statement: false,
    },
};
