import type { Meta, StoryObj } from "@storybook/react";
import Badge from "./Badge";

const meta = {
    component: Badge,
    tags: ["autodocs"],
} satisfies Meta<typeof Badge>;

export default meta;

type BadgeStory = StoryObj<typeof Badge>;

export const Base: BadgeStory = {
    args: {
        children: "Base",
    },
};

export const Inactivated: BadgeStory = {
    args: {
        children: "Inactivated",
        active: false,
    },
};

export const Activated: BadgeStory = {
    args: {
        children: "Activated",
        active: true,
    },
};
