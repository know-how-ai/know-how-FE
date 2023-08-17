import type { Meta, StoryObj } from "@storybook/react";
import ThemeWidget from "./ThemeWidget";

const meta = {
    component: ThemeWidget,
    tags: ["autodocs"],
} satisfies Meta<typeof ThemeWidget>;

export default meta;

type ThemeWidgetStory = StoryObj<typeof ThemeWidget>;

export const Base: ThemeWidgetStory = {
    args: {
        isDarkmode: false,
    },
};

export const Darkmode: ThemeWidgetStory = {
    args: {
        isDarkmode: true,
    },
};
