import type { Meta, StoryObj } from "@storybook/react";
import MainListItem from "./MainListItem";
import { MoonIcon, SunIcon } from "@components/atoms";

const meta = {
    component: MainListItem,
    tags: ["autodocs"],
} satisfies Meta<typeof MainListItem>;

export default meta;

type MainListItemStory = StoryObj<typeof MainListItem>;

export const Base: MainListItemStory = {
    args: {
        href: "#",
        heading: "스토리북",
        Child: SunIcon,
        isDarkmode: false,
    },
};

export const Darkmode: MainListItemStory = {
    args: {
        href: "#",
        heading: "스토리북",
        Child: MoonIcon,
        isDarkmode: true,
    },
};
