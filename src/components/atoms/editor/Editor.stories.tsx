import type { Meta, StoryObj } from "@storybook/react";
import Editor from "./Editor";

const meta = {
    component: Editor,
    tags: ["autodocs"],
} satisfies Meta<typeof Editor>;

export default meta;

type EditorStory = StoryObj<typeof Editor>;

export const Base: EditorStory = {
    args: {
        //
    },
};
