import { type FC, type MutableRefObject, forwardRef } from "react";
import styled from "styled-components";
import LoadingDots from "../loadingDots/LoadingDots";
import { ButtonProps } from "../atomTypes";

const Button_ = styled.button<ButtonProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1.25rem 2rem;
    margin: 1rem auto;
    width: ${(p) => (p.size === "infinite" ? "100%" : null)}; // 조정 필요
    max-width: ${(p) =>
        p.size === "infinite" ? "100%" : "20rem"}; // 조정 필요
    font-size: 1.25rem;
    line-height: 1.25rem;
    border: none;

    aspect-ratio: ${(p) => (p.shape === "square" ? 1 : null)};
    color: ${(p) =>
        p.color === "transparent"
            ? p.theme.color.textColor
            : p.theme.color.light};
    background-color: ${(p) =>
        p.color === "transparent"
            ? p.theme.color.transparent
            : p.theme.color.blue};
    box-shadow: ${(p) =>
        p.color === "transparent" ? p.theme.boxShadow.normal : null};
    border-radius: ${(p) => p.theme.border.radius};
    cursor: ${(p) => (p.loading ? "progress" : "pointer")};
    transition: ${(p) => p.theme.transition.fast};

    :hover:not(:disabled),
    :focus:not(:disabled) {
        opacity: 0.5;
    }

    :active:not(:disabled) {
        opacity: 0.7;
        box-shadow: ${(p) =>
            p.color === "transparent" ? p.theme.boxShadow.strong : null};
    }

    :disabled {
        cursor: not-allowed;
        transition: unset;
        background-color: ${(p) => p.theme.color.darkGray};
    }
`;

const Button: FC<ButtonProps> = forwardRef(
    (
        {
            children,
            disabled,
            onClick,
            ariaLabel,
            className,
            type,
            tabIndex = 0,
            loading,
            color,
            shape,
            size,
        },
        buttonRef
    ) => {
        return (
            <Button_
                type={type}
                ref={buttonRef as MutableRefObject<HTMLButtonElement>} // for when put the children as not a string
                onClick={onClick}
                disabled={disabled}
                className={className}
                aria-label={ariaLabel}
                tabIndex={tabIndex}
                loading={loading}
                color={color}
                shape={shape}
                size={size}
            >
                {loading ? <LoadingDots /> : children}
            </Button_>
        );
    }
);

Button.displayName = "Button";

export default Button;
