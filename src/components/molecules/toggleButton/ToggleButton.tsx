import styled from "styled-components";
import Button from "../../atoms/button/Button";

interface StyledInterface {
    statement?: boolean;
    disabled?: boolean;
}

const Container_ = styled.div<StyledInterface>`
    border: ${(p) => p.theme.border.active};
    border-width: 0.3rem;
    border-radius: 100rem;
    cursor: pointer;
    transition: ${(p) => p.theme.transition.fast};
    max-width: 15rem;
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;

    :hover,
    :focus {
        opacity: 0.7;
    }
`;
const Button_ = styled(Button)<StyledInterface>`
    aspect-ratio: 1;
    border-radius: 100%;
    transform: translateX(-100%);
    animation: ${(p) => (p.statement ? "moveLeft" : "moveRight")} 0.7s forwards
        1 ease-in-out;

    :hover:not(:disabled),
    :focus:not(:disabled) {
        opacity: 1;
    }

    @keyframes moveLeft {
        from {
            transform: translateX(-100%);
            background-color: ${(p) => p.theme.color.blue};
        }
        to {
            transform: translateX(100%);
            background-color: ${(p) => p.theme.color.gray};
        }
    }

    @keyframes moveRight {
        from {
            transform: translateX(100%);
            background-color: ${(p) => p.theme.color.gray};
        }
        to {
            transform: translateX(-100%);
            background-color: ${(p) => p.theme.color.blue};
        }
    }
`;

interface ToggleButton extends StyledInterface {
    onClick?: () => void;
}

const ToggleButton = ({ onClick, statement = true }: ToggleButton) => {
    return (
        <Container_
            statement={statement}
            onClick={onClick}
            aria-label={`current state is ${
                statement ? "left" : "right"
            } side value.`}
        >
            <Button_ statement={statement} />
        </Container_>
    );
};

export default ToggleButton;
