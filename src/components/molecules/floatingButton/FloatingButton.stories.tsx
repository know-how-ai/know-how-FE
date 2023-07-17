import type { Meta, StoryObj } from "@storybook/react";
import FloatingButton from "./FloatingButton";

const meta = {
    component: FloatingButton,
    tags: ["autodocs"],
} satisfies Meta<typeof FloatingButton>;

export default meta;

type HelperButtonStory = StoryObj<typeof FloatingButton>;

export const Base: HelperButtonStory = {
    args: {
        children: "Floating",
        onClick: () => console.log("clicked!"),
    },
};
