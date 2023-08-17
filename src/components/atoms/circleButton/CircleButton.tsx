import type { FC } from "react";
import styled from "styled-components";
import type { ButtonProps } from "../atomTypes";

const CircleButton_ = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    text-align: center;
    word-break: keep-all;
    padding: 0.75rem;
    max-width: 4rem;
    width: 100%;
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
    ...rest
}) => {
    return (
        <CircleButton_
            onClick={onClick}
            className={className}
            aria-label={ariaLabel}
            type={type}
            {...rest}
        >
            {children}
        </CircleButton_>
    );
};

export default CircleButton;
