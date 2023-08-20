import { forwardRef } from "react";
import styled from "styled-components";
import LoadingDots from "../loadingDots/LoadingDots";
import { ButtonProps } from "../atomTypes";
import { media } from "@components/styles/theme";

const Button_ = styled.button<ButtonProps>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1.25rem 2rem;
    margin: 1rem auto;
    width: ${(p) => (p.size === "infinite" ? "100%" : null)}; // 조정 필요
    max-width: ${(p) =>
        p.size === "infinite" ? "40rem" : "20rem"}; // 조정 필요
    ${media.mobile} {
        max-height: 15rem; // 조정 필요
        max-width: 40rem; // 조정 필요
    }
    font-size: 1.25rem;
    line-height: 1.25rem;
    border: none;
    word-break: keep-all;

    aspect-ratio: ${(p) => (p.shape === "square" ? 1 : "initial")};
    color: ${(p) =>
        p.color === "transparent"
            ? p.theme.color.textColor
            : p.theme.color.light};
    background-color: ${(p) =>
        p.color === "transparent"
            ? p.theme.color.transparent
            : p.theme.color.blue};
    box-shadow: ${(p) => (p.boxShadow ? p.theme.boxShadow.normal : "initial")};
    border-radius: ${(p) => p.theme.border.radius};
    cursor: ${(p) => (p.isLoading ? "progress" : "pointer")};
    transition: ${(p) => p.theme.transition.fast};

    :hover:not(:disabled),
    :focus:not(:disabled) {
        opacity: ${(p) => (p.isLoading ? "initial" : 0.7)};
    }

    :active:not(:disabled) {
        box-shadow: ${(p) =>
            !p.isLoading && p.color === "transparent"
                ? p.theme.boxShadow.strong
                : "initial"};
    }

    :disabled {
        cursor: not-allowed;
        transition: unset;
        background-color: ${(p) => p.theme.color.darkGray};
    }
`;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            children,
            disabled,
            onClick,
            ariaLabel,
            className,
            type,
            tabIndex = 0,
            isLoading = false,
            color,
            shape,
            size,
            onKeyDown,
            boxShadow,
        },
        buttonRef
    ) => {
        return (
            <Button_
                type={type}
                ref={buttonRef} // for when put the children as not a string
                onClick={onClick}
                disabled={disabled}
                className={className}
                aria-label={ariaLabel}
                tabIndex={tabIndex}
                isLoading={isLoading}
                color={color}
                shape={shape}
                size={size}
                onKeyDown={onKeyDown}
                boxShadow={boxShadow}
            >
                {isLoading ? <LoadingDots /> : children}
            </Button_>
        );
    }
);

Button.displayName = "Button";

export default Button;
