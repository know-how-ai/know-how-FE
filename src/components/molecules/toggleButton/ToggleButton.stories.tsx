import type { Meta, StoryObj } from "@storybook/react";
import ToggleButton from "./ToggleButton";

const meta = {
    component: ToggleButton,
    tags: ["autodocs"],
} satisfies Meta<typeof ToggleButton>;

export default meta;

type ToggleButtonStory = StoryObj<typeof ToggleButton>;

let state = true;

export const Base: ToggleButtonStory = {
    args: {
        statement: state,
        onClick: () => {
            state = !state;
        },
    },
};
