import styled from "styled-components";

interface ToggleButtonInterface {
    statement?: boolean;
    variant?: "single" | "dual";
    scale?: number;
}

const Toggle_ = styled.button<ToggleButtonInterface>`
    border: ${(p) => p.theme.border.gray};
    border-width: 0.5rem;
    border-radius: 100rem;
    cursor: pointer;
    transition: ${(p) => p.theme.transition.fast};
    max-width: 15rem;
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    scale: ${(p) => (p.scale ? p.scale : "0.5")};
    margin: 0.5rem 0.5rem;

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
    padding: 2rem;
    margin: 1rem;
    border: none;
    display: inline-block;
    background-color: ${(p) => p.theme.color.textColor};
    aspect-ratio: 1;
    border-radius: 100%;
    animation: ${(p) => (p.statement ? "moveRight" : "moveLeft")} 0.7s forwards
        1 ease-in-out;
    -webkit-animation: ${(p) => (p.statement ? "moveRight" : "moveLeft")} 0.7s
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
    scale,
}: ToggleButton) => {
    return (
        <Toggle_
            statement={statement}
            onClick={onClick}
            aria-label={ariaLabel}
            aria-description={ariaDescription}
            scale={scale}
            data-testid={"toggle button"}
        >
            <Ball_ statement={statement} variant={variant} />
        </Toggle_>
    );
};

export default ToggleButton;
