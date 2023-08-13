import type { Meta, StoryObj } from "@storybook/react";
import Textarea from "./Textarea";
import { LabelWrapper } from "@components/molecules";

const meta = {
    component: Textarea,
    tags: ["autodocs"],
} satisfies Meta<typeof Textarea>;

export default meta;

type TextareaStory = StoryObj<typeof Textarea>;

export const Base: TextareaStory = {
    args: {
        placeholder: "Base Textarea",
    },
    decorators: [(story) => <LabelWrapper>{story()}</LabelWrapper>],
};
