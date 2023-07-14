import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import styled from "styled-components";
import { type EditorProps } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import { getDraftByHtml } from "@libs/editor";
// import "../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const EditorComponent = dynamic<EditorProps>(
    () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
    {
        ssr: false,
    }
);
const DraftViewer = dynamic(() => import("@components/atoms/draftViewer"), {
    ssr: false,
});

const EditorContainer = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 80vw;
    border: ${(p) => p.theme.border.gray};
    border-radius: ${(p) => p.theme.border.radius};
    padding: 2rem;

    .rdw-editor-wrapper:focus {
        outline: none;
    }
    .rdw-editor-wrapper {
        box-sizing: content-box;
    }
    .rdw-editor-main blockquote {
        border-left: 5px solid ${(p) => p.theme.color.blue};
        padding-left: 5px;
        margin: 0.5rem initial;
        color: ${(p) => p.theme.color.textColor};
    }
    .rdw-editor-main pre {
        background: ${(p) => p.theme.color.lightBlue};
        border-radius: 1rem;
        padding: 1rem;
        margin: 1rem 0.5rem;
        line-height: 160%;
    }
    .rdw-editor-main pre span {
        line-height: 160%;
    }

    .rdw-editor-main {
        height: 100%;
        overflow: auto;
        box-sizing: border-box;
        margin: 1rem;
        margin-top: 2rem;
    }

    .rdw-inline-wrapper,
    .rdw-list-wrapper,
    .rdw-text-align-wrapper,
    .rdw-link-wrapper {
        display: flex;
        margin-bottom: 0.5rem;
        align-items: center;
        flex-wrap: wrap;
    }

    .rdw-editor-toolbar {
        padding: 0.5rem;
        padding-bottom: 1rem;
        border: none;
        border-radius: 0;
        border-bottom: ${(p) => p.theme.editor.activeBorder};
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
        user-select: none;
        /* margin-bottom: 1rem; */
    }

    .rdw-link-modal {
        position: absolute;
        top: 35px;
        left: 5px;
        min-width: 20rem;
        height: 20rem;
        display: flex;
        flex-direction: column;
        /* border: ${(p) => p.theme.editor.activeBorder}; */
        border-radius: 1rem;
        padding: 15px;
        z-index: 20;
        background: ${(p) => p.theme.editor.bgColor};
        box-shadow: ${(p) => p.theme.boxShadow.strong};
    }
    .rdw-link-modal-label {
        font-size: 1rem;
        margin: 0.5rem;
    }
    .rdw-link-modal-input {
        width: 80%;
        margin: 0 0.5rem;
        color: ${(p) => p.theme.color.textColor};
        border-radius: 1rem;
        border: ${(p) => p.theme.editor.activeBorder};
        transition: ${(p) => p.theme.transition.fast};
        margin: ${(p) => p.theme.size.xs};
        padding: 0.75rem;
        background-color: transparent;
        font-size: 1rem;
        :focus {
            outline: none;
        }
    }
    .rdw-link-modal-buttonsection {
        margin: 0 auto;
    }
    .rdw-link-modal-target-option {
        margin: 1rem auto;
        display: flex;
        align-items: center;
    }
    .rdw-link-modal-target-option > span {
        margin-left: 5px;
    }
    .rdw-link-modal-btn {
        padding: 1.25rem 2rem;
        margin: 0.5rem 1rem;
        max-width: 20rem; // 조정 필요
        font-size: 1.25rem;
        line-height: 1.25rem;
        border: none;
        color: ${(p) => p.theme.color.light};
        background-color: ${(p) => p.theme.color.blue};
        border-radius: ${(p) => p.theme.border.radius};
        text-transform: capitalize;
        transition: ${(p) => p.theme.transition.fast};

        /* NEED TO: disabled style */

        :hover:not(:disabled),
        :focus:not(:disabled) {
            cursor: pointer;
            opacity: 0.5;
            outline: none;
        }

        :disabled {
            opacity: 0.5;
            background-color: ${(p) => p.theme.color.darkGray};
        }

        :active {
            cursor: pointer;
            transition: ${(p) => p.theme.transition.fast};
        }
    }

    .rdw-option-wrapper {
        padding: 0.75rem;
        margin: auto 0.25rem;
        border: ${(p) => p.theme.editor.border};
        border-radius: 0.15rem;
        background-color: ${(p) => p.theme.editor.bgColor};
        box-shadow: none;
        transition: ${(p) => p.theme.transition.fast};

        min-width: 0.75rem;
        height: 1.25rem;
        aspect-ratio: 1;

        display: flex;
        justify-content: center;
        align-items: center;
        text-transform: capitalize;
    }
    .rdw-option-wrapper:hover:not(.rdw-option-disabled),
    .rdw-option-wrapper:active:not(.rdw-option-disabled),
    .rdw-option-active:not(.rdw-option-disabled) {
        cursor: pointer;
        background-color: ${(p) => p.theme.editor.activeColor};
        border: ${(p) => p.theme.editor.activeBorder};
    }

    .rdw-option-disabled {
        opacity: 0.3;
    }

    .rdw-dropdown-wrapper {
        min-width: 4.5rem;
        height: 1.25rem;

        cursor: pointer;
        border: ${(p) => p.theme.editor.border};
        border-radius: 0.15rem;
        background-color: ${(p) => p.theme.editor.bgColor};
        box-shadow: none;
        transition: ${(p) => p.theme.transition.fast};
        padding: 0.75rem;
        margin: auto 0.25rem;
        text-transform: capitalize;
        word-break: keep-all;
    }
    .rdw-dropdown-wrapper:focus,
    .rdw-dropdown-wrapper:hover,
    .rdw-dropdown-wrapper:active {
        border: ${(p) => p.theme.editor.activeBorder};
    }

    .rdw-dropdown-carettoopen,
    .rdw-dropdown-carettoclose {
        height: 0px;
        width: 0px;
        position: absolute;
        top: 35%;
        right: 5%;
        border-top: 5px solid black;
        border-left: 3.5px solid transparent;
        border-right: 3.5px solid transparent;
    }

    .rdw-dropdown-selectedtext {
        display: flex;
        position: relative;
        height: 100%;
        align-items: center;
        padding: 0 5px;
    }
    .rdw-dropdown-optionwrapper {
        z-index: 20;
        position: relative;
        border: 1.5px solid ${(p) => p.theme.color.lightBlue};
        width: 98%;
        background: ${(p) => p.theme.color.backgroundColor};
        color: ${(p) => p.theme.color.textColor};
        border-radius: 0.15rem;
        margin: 0;
        padding: 0;
        max-height: 250px;
        overflow-y: scroll;
        scroll-behavior: smooth;
        scrollbar-width: 25%;
    }

    .rdw-dropdownoption-default {
        min-height: 1.5rem;
        aspect-ratio: 16 / 9;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 5px 6px;
    }
    .rdw-dropdownoption-highlighted,
    .rdw-dropdownoption-active {
        background-color: ${(p) => p.theme.color.lightBlue};
    }
    .rdw-dropdownoption-disabled {
        opacity: 0.3;
        cursor: default;
    }
    .rdw-block-wrapper,
    .rdw-fontsize-wrapper {
        display: flex;
        margin-bottom: 0.5rem;
        align-items: center;
        flex-wrap: wrap;
    }
    .rdw-fontsize-dropdown {
        min-width: 40px;
    }
    .rdw-fontsize-option {
        display: flex;
        justify-content: center;
    }

    // IMAGE
    .rdw-image-wrapper {
        display: flex;
        margin-bottom: 0.5rem;
        align-items: center;
        position: relative;
        flex-wrap: wrap;
    }
    .rdw-image-modal {
        position: absolute;
        top: 35px;
        left: 5px;
        display: flex;
        flex-direction: column;
        min-width: 20rem;
        height: 20rem;
        /* border: ${(p) => p.theme.editor.activeBorder}; */
        border-radius: 1rem;
        padding: 15px;
        z-index: 20;
        background: ${(p) => p.theme.editor.bgColor};
        box-shadow: ${(p) => p.theme.boxShadow.strong};
    }
    .rdw-image-modal-header {
        font-size: 1.25rem;
        margin: 1rem;
        display: flex;
    }
    .rdw-image-modal-header-option {
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .rdw-image-modal-header-label {
        width: 80px;
        background: #f1f1f1;
        border: 1px solid #f1f1f1;
        margin-top: 5px;
    }
    .rdw-image-modal-header-label-highlighted {
        /* background: #6eb8d4; */
        border-bottom: ${(p) => p.theme.editor.activeBorder};
    }
    .rdw-image-modal-upload-option {
        width: 100%;
        color: gray;
        cursor: pointer;
        display: flex;
        border: none;
        font-size: 15px;
        align-items: center;
        justify-content: center;
        background-color: #f1f1f1;
        outline: 2px dashed gray;
        outline-offset: -10px;
        margin: 10px 0;
        padding: 9px 0;
    }
    .rdw-image-modal-upload-option-highlighted {
        outline: 2px dashed ${(p) => p.theme.color.blue};
    }
    .rdw-image-modal-upload-option-label {
        cursor: pointer;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 15px;
    }
    .rdw-image-modal-upload-option-label span {
        padding: 0 20px;
    }
    .rdw-image-modal-upload-option-image-preview {
        max-width: 100%;
        max-height: 200px;
    }
    .rdw-image-modal-upload-option-input {
        width: 0.1px;
        height: 0.1px;
        opacity: 0;
        overflow: hidden;
        position: absolute;
        z-index: -1;
    }
    .rdw-image-modal-url-section {
        display: flex;
        align-items: center;
    }
    .rdw-image-modal-url-input {
        width: 80%;
        margin: 0 0.5rem;
        color: ${(p) => p.theme.color.textColor};
        border-radius: 1rem;
        border: ${(p) => p.theme.editor.activeBorder};
        transition: ${(p) => p.theme.transition.fast};
        margin: ${(p) => p.theme.size.xs};
        padding: ${(p) => p.theme.size.sm};
        background-color: transparent;
        font-size: 1rem;
        :focus {
            outline: none;
        }
    }
    .rdw-image-modal-btn-section {
        margin: 10px auto 0;
    }
    .rdw-image-modal-btn {
        padding: 1.25rem 2rem;
        margin: 0.5rem 1rem;
        max-width: 20rem; // 조정 필요
        font-size: 1.25rem;
        line-height: 1.25rem;
        border: none;
        color: ${(p) => p.theme.color.light};
        background-color: ${(p) => p.theme.color.blue};
        border-radius: ${(p) => p.theme.border.radius};
        text-transform: capitalize;
        transition: ${(p) => p.theme.transition.fast};

        :hover:not(:disabled),
        :focus:not(:disabled) {
            cursor: pointer;
            opacity: 0.5;
            outline: none;
        }

        :disabled {
            opacity: 0.5;
            background-color: ${(p) => p.theme.color.darkGray};
        }

        :active {
            cursor: pointer;
            transition: ${(p) => p.theme.transition.fast};
        }
    }
    .rdw-image-modal-spinner {
        position: absolute;
        top: -3px;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0.5;
    }
    .rdw-image-modal-alt-input {
        width: 70%;
        height: 20px;
        border: 1px solid #f1f1f1;
        border-radius: 2px;
        font-size: 12px;
        margin-left: 5px;
    }
    .rdw-image-modal-alt-input:focus {
        outline: none;
    }
    .rdw-image-modal-alt-lbl {
        font-size: 12px;
    }
    .rdw-image-modal-size {
        display: flex;
        margin: 1rem;
        align-items: center;
        justify-content: space-between;
    }
    .rdw-image-modal-size-input {
        width: 40%;

        margin: 0 0.5rem;
        color: ${(p) => p.theme.color.textColor};
        border-radius: 1rem;
        border: ${(p) => p.theme.editor.activeBorder};
        transition: ${(p) => p.theme.transition.fast};
        margin: ${(p) => p.theme.size.xs};
        padding: ${(p) => p.theme.size.xs};
        background-color: transparent;
        font-size: 1rem;
        :focus {
            outline: none;
        }
    }
    .rdw-image-modal-size-input:focus {
        outline: none;
    }
    .rdw-image-mandatory-sign {
        color: red;
        margin-left: 3px;
        margin-right: 3px;
    }
    .rdw-image-alignment-options-popup {
        position: absolute;
        bottom: 0px;
        background: ${(p) => p.theme.color.lightBlue};
        display: flex;
        padding: 5px 2px;
        border-radius: 0.15rem;
        width: fit-content;
        cursor: pointer;
        z-index: 20;
    }
    .rdw-alignment-option-left {
        justify-content: flex-start;
    }
    .rdw-image-alignment-option {
        height: 1rem;
        min-width: 15px;
        aspect-ratio: 1 / 1;
    }
    .rdw-image-alignment,
    .rdw-image-imagewrapper {
        position: relative;
    }
    .rdw-image-center {
        display: flex;
        justify-content: center;
    }
    .rdw-image-left {
        display: flex;
    }
    .rdw-image-right {
        display: flex;
        justify-content: flex-end;
    }
    .rdw-image-alignment-options-popup-right {
        right: 0;
    }

    // HISTORY
    .rdw-history-wrapper {
        display: flex;
        align-items: center;
        margin-bottom: 0.5rem;
        flex-wrap: wrap;
    }
    .rdw-history-dropdownoption {
        height: 40px;
        display: flex;
        justify-content: center;
    }
    .rdw-history-dropdown {
        width: 50px;
    }

    .rdw-right-aligned-block {
        text-align: right;
    }
    .rdw-left-aligned-block {
        text-align: left !important;
    }
    .rdw-center-aligned-block {
        text-align: center !important;
    }
    .rdw-justify-aligned-block {
        text-align: justify !important;
    }
    .rdw-right-aligned-block > div,
    .rdw-left-aligned-block > div,
    .rdw-center-aligned-block > div,
    .rdw-justify-aligned-block > div {
        display: inline-block;
    }

    // line-height
    .DraftEditor-editorContainer > div > div > div {
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
        color: ${(p) => p.theme.color.textColor};
    }

    /**
     * Draft v0.9.1
     *
     * Copyright (c) 2013-present, Facebook, Inc.
     * All rights reserved.
     *
     * This source code is licensed under the BSD-style license found in the
     * LICENSE file in the root directory of this source tree. An additional grant
     * of patent rights can be found in the PATENTS file in the same directory.
     */
    .DraftEditor-editorContainer,
    .DraftEditor-root,
    .public-DraftEditor-content {
        height: inherit;
        text-align: initial;
    }
    .public-DraftEditor-content[contenteditable="true"] {
        -webkit-user-modify: read-write-plaintext-only;
    }
    .DraftEditor-root {
        position: relative;
    }
    .DraftEditor-editorContainer {
        background-color: rgba(255, 255, 255, 0);
        border-left: 0.1px solid transparent;
        position: relative;
        z-index: 1;
    }
    .public-DraftEditor-block {
        position: relative;
    }
    .DraftEditor-alignLeft .public-DraftStyleDefault-block {
        text-align: left;
    }
    .DraftEditor-alignLeft .public-DraftEditorPlaceholder-root {
        left: 0;
        text-align: left;
    }
    .DraftEditor-alignCenter .public-DraftStyleDefault-block {
        text-align: center;
    }
    .DraftEditor-alignCenter .public-DraftEditorPlaceholder-root {
        margin: 0 auto;
        text-align: center;
        width: 100%;
    }
    .DraftEditor-alignRight .public-DraftStyleDefault-block {
        text-align: right;
    }
    .DraftEditor-alignRight .public-DraftEditorPlaceholder-root {
        right: 0;
        text-align: right;
    }
    .public-DraftEditorPlaceholder-root {
        color: #9197a3;
        position: absolute;
        z-index: 0;
    }
    .public-DraftEditorPlaceholder-hasFocus {
        color: #bdc1c9;
    }
    .DraftEditorPlaceholder-hidden {
        display: none;
    }
    .public-DraftStyleDefault-block {
        position: relative;
        white-space: pre-wrap;
    }
    .public-DraftStyleDefault-ltr {
        direction: ltr;
        text-align: left;
    }
    .public-DraftStyleDefault-rtl {
        direction: rtl;
        text-align: right;
    }
    .public-DraftStyleDefault-listLTR {
        direction: ltr;
    }
    .public-DraftStyleDefault-listRTL {
        direction: rtl;
    }
    .public-DraftStyleDefault-ol,
    .public-DraftStyleDefault-ul {
        margin: 16px 0;
        padding: 0;
    }
    .public-DraftStyleDefault-depth0.public-DraftStyleDefault-listLTR {
        margin-left: 1.5em;
    }
    .public-DraftStyleDefault-depth0.public-DraftStyleDefault-listRTL {
        margin-right: 1.5em;
    }
    .public-DraftStyleDefault-depth1.public-DraftStyleDefault-listLTR {
        margin-left: 3em;
    }
    .public-DraftStyleDefault-depth1.public-DraftStyleDefault-listRTL {
        margin-right: 3em;
    }
    .public-DraftStyleDefault-depth2.public-DraftStyleDefault-listLTR {
        margin-left: 4.5em;
    }
    .public-DraftStyleDefault-depth2.public-DraftStyleDefault-listRTL {
        margin-right: 4.5em;
    }
    .public-DraftStyleDefault-depth3.public-DraftStyleDefault-listLTR {
        margin-left: 6em;
    }
    .public-DraftStyleDefault-depth3.public-DraftStyleDefault-listRTL {
        margin-right: 6em;
    }
    .public-DraftStyleDefault-depth4.public-DraftStyleDefault-listLTR {
        margin-left: 7.5em;
    }
    .public-DraftStyleDefault-depth4.public-DraftStyleDefault-listRTL {
        margin-right: 7.5em;
    }
    .public-DraftStyleDefault-unorderedListItem {
        list-style-type: square;
        position: relative;
    }
    .public-DraftStyleDefault-unorderedListItem.public-DraftStyleDefault-depth0 {
        list-style-type: disc;
    }
    .public-DraftStyleDefault-unorderedListItem.public-DraftStyleDefault-depth1 {
        list-style-type: circle;
    }
    .public-DraftStyleDefault-orderedListItem {
        list-style-type: none;
        position: relative;
    }
    .public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-listLTR:before {
        left: -36px;
        position: absolute;
        text-align: right;
        width: 30px;
    }
    .public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-listRTL:before {
        position: absolute;
        right: -36px;
        text-align: left;
        width: 30px;
    }
    .public-DraftStyleDefault-orderedListItem:before {
        content: counter(ol0) ". ";
        counter-increment: ol0;
    }
    .public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-depth1:before {
        content: counter(ol1) ". ";
        counter-increment: ol1;
    }
    .public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-depth2:before {
        content: counter(ol2) ". ";
        counter-increment: ol2;
    }
    .public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-depth3:before {
        content: counter(ol3) ". ";
        counter-increment: ol3;
    }
    .public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-depth4:before {
        content: counter(ol4) ". ";
        counter-increment: ol4;
    }
    .public-DraftStyleDefault-depth0.public-DraftStyleDefault-reset {
        counter-reset: ol0;
    }
    .public-DraftStyleDefault-depth1.public-DraftStyleDefault-reset {
        counter-reset: ol1;
    }
    .public-DraftStyleDefault-depth2.public-DraftStyleDefault-reset {
        counter-reset: ol2;
    }
    .public-DraftStyleDefault-depth3.public-DraftStyleDefault-reset {
        counter-reset: ol3;
    }
    .public-DraftStyleDefault-depth4.public-DraftStyleDefault-reset {
        counter-reset: ol4;
    }
`;

interface Props {
    defaultState?: string;
}

const Editor = ({ defaultState }: Props) => {
    const [editing, setEditing] = useState<EditorState>(
        EditorState?.createEmpty()
    );

    const onEditorStateChange = (editedState: EditorState) => {
        setEditing(editedState);
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            if (defaultState) {
                const editingState = getDraftByHtml(defaultState);

                setEditing(editingState);
            }
        }
    }, []);

    return (
        <>
            <EditorContainer data-testid="editor">
                <EditorComponent
                    editorState={editing}
                    onEditorStateChange={onEditorStateChange}
                    placeholder="내용을 작성해주세요."
                    toolbar={{
                        options: [
                            "inline",
                            "fontSize",
                            "blockType",
                            "textAlign",
                            "history",
                            "list",
                            "image",
                            "link",
                        ],
                    }}
                    localization={{
                        locale: "ko",
                    }}
                />
                <DraftViewer draft={editing} />
            </EditorContainer>
            {/* 미리보기 토글 추가하기 */}
        </>
    );
};

export default Editor;
