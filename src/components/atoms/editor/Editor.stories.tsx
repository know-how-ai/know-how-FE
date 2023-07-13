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

export const Typed: EditorStory = {
    args: {
        defaultState: `<pre>const editorToHtml =
        draftToHtml(convertToRaw(editorState.getCurrentContent()));</pre>
        <p style="text-align:center;"><strong>ㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇ
        </strong></p>`,
    },
};
