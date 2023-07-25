import type { FC } from "react";
import styled from "styled-components";
import type { ButtonProps } from "../atomTypes";

const CircleButton_ = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1.5rem;
    border: none;
    text-align: center;
    word-break: keep-all;
    width: 100%;
    padding: 0.5rem;
    max-width: 4rem;
    aspect-ratio: 1;
    border-radius: 100rem;
    background-color: ${(p) => p.theme.color.lightBlue};
    color: ${(p) => p.theme.color.textColor};

    :hover:not(:disabled),
    :focus:not(:disabled) {
        cursor: pointer;
        opacity: 0.5;
        transition: ${(p) => p.theme.transition.fast};
    }

    :disabled {
        cursor: not-allowed;
        background-color: ${(p) => p.theme.color.darkGray};
    }
`;

const CircleButton: FC<ButtonProps> = ({
    children,
    ariaLabel,
    className,
    onClick,
    type,
}) => {
    return (
        <CircleButton_
            onClick={onClick}
            className={className}
            aria-label={ariaLabel}
            type={type}
        >
            {children}
        </CircleButton_>
    );
};

export default CircleButton;
