import type { Meta, StoryObj } from "@storybook/react";
import Select from "./Select";
import { LabelWrapper } from "@components/molecules";

const meta = {
    component: Select,
    tags: ["autodocs"],
} satisfies Meta<typeof Select>;

export default meta;

type SelectStory = StoryObj<typeof Select>;

export const Base: SelectStory = {
    args: {
        options: ["chocolate", "strawberry", "banana", "coffee"],
    },
    decorators: [(story) => <LabelWrapper>{story()}</LabelWrapper>],
};
