import { ContentState, EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";

export const getDraftByHtml = (html: string) => {
    const htmlToDraft = require("html-to-draftjs").default;
    const blocksFromHtml = htmlToDraft(html);

    if (blocksFromHtml) {
        const { contentBlocks, entityMap } = blocksFromHtml;

        const contentState = ContentState?.createFromBlockArray(
            contentBlocks,
            entityMap
        );

        const editingState = EditorState?.createWithContent(contentState);

        return editingState;
    }

    return EditorState?.createEmpty();
};

export const getHtmlByDraft = (draft?: ContentState) => {
    /**
     * 1. 작성된 EditorState 객체
     * 2. convertToRaw() 함수를 이용해 원시 JS 객체로 변환
     * 3. 원시 JS 객체를 draftToHtml() 함수를 이용해 HTML 문자열로 변환
     * 4. dangerouslySetInnerHTML 속성을 통해 직접 렌더링
     * => 보안적 사항에 대한 이슈 처리는 어떻게?
     */
    if (draft) {
        const html = draftToHtml(
            // @ts-ignore
            convertToRaw(draft.getCurrentContent())
        );

        return html;
    }

    return "";
};
