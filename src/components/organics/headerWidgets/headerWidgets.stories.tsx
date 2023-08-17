import type { Meta, StoryObj } from "@storybook/react";
import HeaderWidgets from "./HeaderWidgets";

const meta = {
    component: HeaderWidgets,
    tags: ["autodocs"],
} satisfies Meta<typeof HeaderWidgets>;

export default meta;

type HeaderWidgetsStory = StoryObj<typeof HeaderWidgets>;

export const Base: HeaderWidgetsStory = {
    args: {
        profileWidget: true,
        themeWidget: true,
    },
};

export const OnlyProfileWidget: HeaderWidgetsStory = {
    args: {
        profileWidget: true,
    },
};

export const OnlyThemeWidget: HeaderWidgetsStory = {
    args: {
        themeWidget: true,
    },
};

export const NonWidget: HeaderWidgetsStory = {
    args: {},
};
