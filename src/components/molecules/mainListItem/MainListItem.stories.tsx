import type { Meta, StoryObj } from "@storybook/react";
import MainListItem from "./MainListItem";
import { SunIcon } from "@components/atoms";

const meta = {
    component: MainListItem,
    tags: ["autodocs"],
} satisfies Meta<typeof MainListItem>;

export default meta;

type MainListItemStory = StoryObj<typeof MainListItem>;

export const Base: MainListItemStory = {
    args: {
        href: "#",
        heading: "스토리북 테스트",
        Child: SunIcon,
    },
};
