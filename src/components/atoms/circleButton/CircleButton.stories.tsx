import type { Meta, StoryObj } from "@storybook/react";
import CircleButton from "./CircleButton";
import { SunIcon } from "../icons";

const meta = {
    component: CircleButton,
    tags: ["autodocs"],
} satisfies Meta<typeof CircleButton>;

export default meta;

type CircleButtonStory = StoryObj<typeof CircleButton>;

export const Base: CircleButtonStory = {
    args: {
        children: <SunIcon />,
    },
};
