import type { Meta, StoryObj } from "@storybook/react";
import Header from "./Header";

const meta = {
    component: Header,
    tags: ["autodocs"],
} satisfies Meta<typeof Header>;

export default meta;

type HeaderStory = StoryObj<typeof Header>;

export const Light: HeaderStory = {
    args: {
        isDarkmode: false,
    },
};

export const Dark: HeaderStory = {
    args: {
        isDarkmode: true,
    },
};
