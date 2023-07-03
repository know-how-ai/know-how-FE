import {
    type FC,
    type ReactNode,
    type MouseEventHandler,
    type MutableRefObject,
    forwardRef,
} from "react";
import styled from "styled-components";

interface StyleProps {
    disabled?: boolean;
}

const Btn = styled.button<StyleProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1.25rem 2rem;
    margin: 1rem;
    max-width: 20rem; // 조정 필요
    font-size: 1.25rem;
    line-height: 1.25rem;
    border: none;
    color: ${(p) => p.theme.color.light};
    background-color: ${(p) => p.theme.color.blue};
    border-radius: ${(p) => p.theme.border.radius};

    /* NEED TO: disabled style */

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

interface ButtonProps extends StyleProps {
    children?: ReactNode | string;
    onClick?: MouseEventHandler<HTMLButtonElement> | (() => void);
    className?: string;
}

const Button: FC<ButtonProps> = forwardRef(
    ({ children, disabled, onClick, className }, buttonRef) => {
        return (
            <Btn
                ref={buttonRef as MutableRefObject<HTMLButtonElement>} // for when put the children as not a string
                onClick={onClick}
                disabled={disabled}
                className={className}
            >
                {children}
            </Btn>
        );
    }
);

Button.displayName = "Button";

export default Button;
