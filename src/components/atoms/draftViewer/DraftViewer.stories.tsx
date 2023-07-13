import type { Meta, StoryObj } from "@storybook/react";
import DraftViewer from "./DraftViewer";
import htmlToDraft from "html-to-draftjs";
import { ContentState, EditorState } from "draft-js";

const meta = {
    component: DraftViewer,
    tags: ["autodocs"],
} satisfies Meta<typeof DraftViewer>;

export default meta;

type DraftViewerStory = StoryObj<typeof DraftViewer>;

export const Base: DraftViewerStory = {
    args: {
        //
    },
};

const { contentBlocks, entityMap } = htmlToDraft(`<pre>const editorToHtml =
draftToHtml(convertToRaw(editorState.getCurrentContent()));</pre>
<p style="text-align:center;"><strong>ㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇㅎㅇ
</strong></p>`);

const contentState = ContentState?.createFromBlockArray(
    contentBlocks,
    entityMap
);

const testDraft = EditorState?.createWithContent(contentState);

export const Typed: DraftViewerStory = {
    args: {
        draft: testDraft,
    },
};
