import {
    type FC,
    type ReactNode,
    type MouseEventHandler,
    type MutableRefObject,
    forwardRef,
} from "react";
import styled from "styled-components";

const Btn = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem 2rem;
    margin: 1rem;
    max-width: 20rem; // 조정 필요
    font-size: 1.5rem;
    /* color: ${(p) => p.theme.color.textColor}; */
    background-color: ${(p) => p.theme.color.lightGreen};

    :hover,
    :focus {
        opacity: 0.5;
        transition: ${(p) => p.theme.transition.fast};
    }
`;

interface ButtonProps {
    children?: ReactNode | string;
    disabled?: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement> | (() => void);
}

const Button: FC<ButtonProps> = forwardRef(
    ({ children, disabled, onClick }, buttonRef) => {
        return (
            <Btn
                ref={buttonRef as MutableRefObject<HTMLButtonElement>} // for when put the children as not a string
                onClick={onClick}
                disabled={disabled}
            >
                {children}
            </Btn>
        );
    }
);

Button.displayName = "Button";

export default Button;
