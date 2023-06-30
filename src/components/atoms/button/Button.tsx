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
    padding: 1rem 2rem;
    margin: 1rem;
    max-width: 20rem; // 조정 필요
    font-size: 1.25rem;
    /* color: ${(p) => p.theme.color.textColor}; */
    background-color: ${(p) => p.theme.color.lightGreen};
    border-radius: ${(p) => p.theme.border.radius};

    /* NEED TO: disabled style */

    :hover,
    :focus {
        opacity: 0.5;
        transition: ${(p) => p.theme.transition.fast};
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
