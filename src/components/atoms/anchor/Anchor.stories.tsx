import type { Meta, StoryObj } from "@storybook/react";
import Anchor from "./Anchor";
import Button from "../button/Button";

const meta = {
    component: Anchor,
    tags: ["autodocs"],
} satisfies Meta<typeof Anchor>;

export default meta;

type AnchorStory = StoryObj<typeof Anchor>;

export const Base: AnchorStory = {
    args: {
        href: "#",
        children: "Anchor w/ Button",
    },
};

export const WithButton: AnchorStory = {
    args: {
        href: "#",
        children: "Anchor w/ Button",
    },
    decorators: [(story) => <Button>{story()}</Button>],
};
