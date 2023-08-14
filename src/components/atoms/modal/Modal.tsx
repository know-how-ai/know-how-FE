import { fadeIn, uprise } from "../../styles/keyframes";
import { media } from "../../styles/theme";
import {
    useRef,
    useCallback,
    useEffect,
    type FC,
    type MutableRefObject,
    type ReactNode,
} from "react";
import styled from "styled-components";
import { CloseIcon } from "../icons";

const RootContainer = styled.div`
    display: flex;
    justify-content: center;
    position: fixed;
    background-color: #00000050;
    filter: ${(p) => p.theme.filter.blur};
    z-index: 20;
    inset: 0;
    transition: ${(p) => p.theme.transition.fast};
    animation: ${fadeIn} 0.3s ease-out;
    backdrop-filter: blur(1px);
`;

const ModalContainer = styled.div`
    position: relative;
    margin: auto;
    margin-top: 4rem;
    box-sizing: border-box;
`;

const ModalContent = styled.div`
    margin: 2rem auto;
    background-color: ${(p) => p.theme.color.backgroundColor};
    /* border: ${(p) => p.theme.border.active}; */
    box-shadow: ${(p) => p.theme.boxShadow.strong};
    border-radius: ${(p) => p.theme.border.radius};
    padding: 6rem ${(p) => p.theme.size.lg};
    outline: none;
    width: auto;
    max-width: 80vw;
    max-height: 60vh;
    z-index: 21;
    ${media.tablet} {
        max-width: 80vw;
        max-height: 60vh;
    }
    transition: ${(p) => p.theme.transition.fast};
    animation: ${uprise} 0.3s ease-in-out;
    overflow-y: auto;
    scroll-behavior: smooth;
`;

const CloseBtn = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    aspect-ratio: 1;
    width: 4rem;
    transition: ${(p) => p.theme.transition.fast};
    position: absolute;
    left: 2rem;
    top: 4rem;
    background-color: ${(p) => p.theme.color.lightBlue};
    /* border: ${(p) => p.theme.border.gray}; */
    border-radius: ${(p) => p.theme.border.radius};
    z-index: 21;
    animation: ${uprise} 0.3s ease-in-out;

    svg {
        scale: 0.5;
    }

    :hover,
    :focus {
        opacity: 0.5;
        svg {
            stroke: ${(p) => p.theme.color.red};
        }
    }
`;

interface ModalProps {
    children?: ReactNode;
    handleClose: Function;
}

const Modal: FC<ModalProps> = ({ handleClose, children }) => {
    // for delivery ref
    const ref = useRef() as MutableRefObject<HTMLDivElement>;

    // close modal by using button
    const onClickClose = useCallback(() => handleClose(), [handleClose]);
    const handleKeydownEscape = useCallback(
        // close modal by pressing Escape key
        (e: KeyboardEvent) => {
            if (/escape/i.test(e.key)) {
                return handleClose();
            }
        },
        [handleClose]
    );

    useEffect(() => {
        const { current } = ref;

        if (current) {
            if (typeof window !== "undefined") {
                window.addEventListener("keydown", handleKeydownEscape);

                //  lock body scrolling
                if (typeof document !== "undefined") {
                    document.body.style.overflow = "hidden";
                }
            }
        }

        return () => {
            if (typeof window !== "undefined") {
                window.removeEventListener("keydown", handleKeydownEscape);

                // unlock body scrolling
                if (typeof document !== "undefined") {
                    document.body.style.overflow = "initial";
                }
            }
        };
    }, [handleKeydownEscape]);

    return (
        <RootContainer>
            <ModalContainer
                role="dialog"
                aria-label="Modal Container"
                ref={ref}
                data-testid={"modal"}
            >
                <CloseBtn
                    data-testid="close button"
                    aria-label="Closing this modal button"
                    onClick={onClickClose}
                >
                    <CloseIcon strokeWidth={2.5} />
                </CloseBtn>
                <ModalContent aria-label="Contents in Modal" tabIndex={-1}>
                    {children}
                </ModalContent>
            </ModalContainer>
        </RootContainer>
    );
};

export default Modal;
