import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { useEffect, useState } from "react";
import type { ContentState } from "react-draft-wysiwyg";
import styled from "styled-components";

const DraftViewer_ = styled.div`
    overflow: hidden;
`;

interface DraftViewerProps {
    draft: ContentState | any; // NEEDS TO FIX
}

const DraftViewer = ({ draft }: DraftViewerProps) => {
    /**
     * 1. 작성된 EditorState 객체
     * 2. convertToRaw() 함수를 이용해 원시 JS 객체로 변환
     * 3. 원시 JS 객체를 draftToHtml() 함수를 이용해 HTML 문자열로 변환
     * 4. dangerouslySetInnerHTML 속성을 통해 직접 렌더링
     * => 보안적 사항에 대한 이슈 처리는 어떻게?
     */

    const [html, setHtml] = useState<string>("");

    // ONLY WORKS FOR THE FIRST TIME
    useEffect(() => {
        setHtml(draftToHtml(convertToRaw(draft)));
    }, []);

    return <DraftViewer_ dangerouslySetInnerHTML={{ __html: html }} />;
};

export default DraftViewer;
