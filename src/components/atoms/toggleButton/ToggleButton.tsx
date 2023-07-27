import styled from "styled-components";

interface ToggleButtonInterface {
    statement?: boolean;
    variant?: "single" | "dual";
}

const Toggle_ = styled.button<ToggleButtonInterface>`
    border: ${(p) => p.theme.border.gray};
    border-width: 0.25rem;
    border-radius: 100rem;
    cursor: pointer;
    transition: ${(p) => p.theme.transition.fast};
    width: 5rem;
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem;

    :hover:not(:disabled),
    :focus:not(:disabled),
    :active:not(:disabled) {
        opacity: 0.5;
    }

    :disabled {
        cursor: not-allowed;
        background-color: ${(p) => p.theme.color.gray};
    }
`;

const Ball_ = styled.span<ToggleButtonInterface>`
    display: inline-block;
    max-width: 0.1rem;
    padding: 0.6rem;
    margin: 0.3rem;
    border: none;
    background-color: ${(p) => p.theme.color.textColor};
    aspect-ratio: 1;
    border-radius: 100%;
    animation: ${(p) => (p.statement ? "moveRight" : "moveLeft")} 0.5s forwards
        1 ease-in-out;
    -webkit-animation: ${(p) => (p.statement ? "moveRight" : "moveLeft")} 0.5s
        forwards 1 ease-in-out;

    @keyframes moveLeft {
        from {
            transform: translateX(-100%);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: ${(p) => (p.variant === "single" ? 0.5 : 1)};
        }
    }

    @keyframes moveRight {
        from {
            transform: translateX(100%);
            opacity: ${(p) => (p.variant === "single" ? 0.5 : 1)};
        }
        to {
            transform: translateX(-100%);
            opacity: 1;
        }
    }
`;

interface ToggleButton extends ToggleButtonInterface {
    onClick?: () => void;
    ariaLabel?: string;
    ariaDescription?: string;
}

const ToggleButton = ({
    onClick,
    statement = false,
    variant = "single",
    ariaLabel,
    ariaDescription,
}: ToggleButton) => {
    return (
        <Toggle_
            statement={statement}
            onClick={onClick}
            aria-label={ariaLabel}
            aria-description={ariaDescription}
            data-testid={"toggle button"}
        >
            <Ball_ statement={statement} variant={variant} />
        </Toggle_>
    );
};

export default ToggleButton;
