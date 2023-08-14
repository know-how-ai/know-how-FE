import { useCallback, useState } from "react";
import styled from "styled-components";

const ToolTipSpan = styled.span`
    display: inline-block;
    font-style: italic;
    color: ${(p) => p.theme.color.textColor};
    word-break: keep-all;
    line-height: 1.5rem;
    text-align: center;
    white-space: pre;
`;

const ToolTipWrapper = styled.section`
    position: relative;
    display: flex;
    width: 100%;
`;

const ToolTipBox = styled.article`
    gap: 1rem;
    position: absolute;
    border: ${(p) => p.theme.border.active};
    border-radius: ${(p) => p.theme.border.radius};
    box-shadow: ${(p) => p.theme.boxShadow.strong};
    animation: fadeIn 0.3s 1 forwards ease-in-out;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: 2rem;
    width: max-content;
    top: 4rem;
    left: 0;
    right: 0;
    margin: auto;
    background-color: ${(p) => p.theme.color.backgroundColor}99;
    backdrop-filter: blur(2px);
    z-index: 1;

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-0.5rem);
        }
        to {
            transform: translateY(0rem);
            opacity: 1;
        }
    }
`;

const ToolTipButton = styled.span`
    margin: 1rem auto;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;
    border: ${(p) => p.theme.border.gray};
    border-radius: 100rem;
    padding: 0.5rem;
    font-weight: 600;
    width: 1rem;
    height: 1rem;
    aspect-ratio: 1;
    transition: ${(p) => p.theme.transition.fast};

    :hover,
    :active {
        border: ${(p) => p.theme.border.active};
        background-color: ${(p) => p.theme.color.lightBlue};
        /* box-shadow: inset ${(p) => p.theme.boxShadow.normal}; */
    }
`;

interface ToolTipProps {
    contents?: string[];
}

const ToolTip = ({ contents }: ToolTipProps) => {
    const [tooltip, setTooltip] = useState<boolean>(false);
    const onMouseEnter = useCallback(() => {
        setTooltip(true);
    }, []);

    const onMouseLeave = useCallback(() => {
        setTooltip(false);
    }, []);

    return (
        <ToolTipWrapper>
            <ToolTipButton
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                ?
            </ToolTipButton>

            {tooltip ? (
                <ToolTipBox>
                    {contents?.map((content, index) => (
                        <ToolTipSpan key={"tooltip__" + String(index)}>
                            {content}
                        </ToolTipSpan>
                    ))}
                </ToolTipBox>
            ) : null}
        </ToolTipWrapper>
    );
};

ToolTip.displayName = "ToolTip";

export default ToolTip;
