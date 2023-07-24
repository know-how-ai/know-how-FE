import styled from "styled-components";
import Button from "../../atoms/button/Button";

interface StyledInterface {
    statement?: boolean;
    // disabled?: boolean;
    variant?: "single" | "dual";
    scale?: number;
}

const Container_ = styled.div<StyledInterface>`
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

    :hover {
        opacity: 0.7;
    }
`;
const Button_ = styled(Button)<StyledInterface>`
    aspect-ratio: 1;
    border-radius: 100% !important;
    animation: ${(p) => (p.statement ? "moveRight" : "moveLeft")} 0.7s forwards
        1 ease-in-out;

    :hover:not(:disabled) {
        opacity: 1;
    }

    // 포커싱되었을때 동작하지 않음?
    /* :focus:not(:disabled) {
        background-color: ${(p) => p.theme.color.blue};
    } */

    @keyframes moveLeft {
        from {
            transform: translateX(-100%);
            background-color: ${(p) => p.theme.color.textColor};
        }
        to {
            transform: translateX(100%);
            background-color: ${(p) =>
                p.variant === "single"
                    ? p.theme.color.gray
                    : p.theme.color.textColor};
        }
    }

    @keyframes moveRight {
        from {
            transform: translateX(100%);
            background-color: ${(p) =>
                p.variant === "single"
                    ? p.theme.color.gray
                    : p.theme.color.textColor};
        }
        to {
            transform: translateX(-100%);
            background-color: ${(p) => p.theme.color.textColor};
        }
    }
`;

interface ToggleButton extends StyledInterface {
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
        <Container_
            statement={statement}
            onClick={onClick}
            aria-label={ariaLabel}
            aria-description={ariaDescription}
            scale={scale}
            data-testid={"toggle button"}
        >
            <Button_ statement={statement} variant={variant} />
        </Container_>
    );
};

export default ToggleButton;
