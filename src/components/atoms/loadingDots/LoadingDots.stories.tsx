import type { Meta, StoryObj } from "@storybook/react";
import LoadingDots from "./LoadingDots";
import Button from "../button/Button";

const meta = {
    component: LoadingDots,
    tags: ["autodocs"],
} satisfies Meta<typeof LoadingDots>;

export default meta;

type LoadingDotsStory = StoryObj<typeof LoadingDots>;

export const Base: LoadingDotsStory = {
    args: {},
    decorators: [(story) => <Button isLoading={true}>{story()}</Button>],
};
