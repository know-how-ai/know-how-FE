import { type ContentState } from "draft-js";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { getHtmlByDraft } from "@libs/editor";

const DraftViewer_ = styled.div`
    overflow: hidden;
    blockquote {
        border-left: 5px solid ${(p) => p.theme.color.blue};
        padding-left: 5px;
        margin: 0.5rem initial;
        color: ${(p) => p.theme.color.textColor};
    }
    pre {
        background: ${(p) => p.theme.color.lightBlue};
        border-radius: 1rem;
        padding: 1rem;
        margin: 1rem 0.5rem;
        line-height: 160%;
    }
    pre span {
        line-height: 160%;
    }
`;

interface DraftViewerProps {
    draft: ContentState | any; // NEEDS TO FIX
}

const DraftViewer = ({ draft }: DraftViewerProps) => {
    const [html, setHtml] = useState<string>("");

    // ONLY WORKS FOR THE FIRST TIME
    useEffect(() => {
        if (typeof window !== "undefined") {
            const converted = getHtmlByDraft(draft);
            setHtml(converted);
        }
    }, []);

    return <DraftViewer_ dangerouslySetInnerHTML={{ __html: html }} />;
};

export default DraftViewer;
