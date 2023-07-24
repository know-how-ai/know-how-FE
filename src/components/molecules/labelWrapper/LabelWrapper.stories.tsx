import type { Meta, StoryObj } from "@storybook/react";
import LabelWrapper from "./LabelWrapper";
import { Input } from "@components/atoms";

const meta = {
    component: LabelWrapper,
    tags: ["autodocs"],
} satisfies Meta<typeof LabelWrapper>;

export default meta;

type LabelWrapperStory = StoryObj<typeof LabelWrapper>;

export const Base: LabelWrapperStory = {
    args: {
        label: "Base",
        children: <Input type="text" />,
    },
};
