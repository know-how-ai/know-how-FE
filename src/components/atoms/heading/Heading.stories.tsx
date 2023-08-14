import type { Meta, StoryObj } from "@storybook/react";
import Heading from "./Heading";

const meta = {
    component: Heading,
    tags: ["autodocs"],
} satisfies Meta<typeof Heading>;

export default meta;

type HeadingStory = StoryObj<typeof Heading>;

export const Base: HeadingStory = {
    args: {
        children: "헤딩3",
    },
};
