import { fadeIn, uprise } from "@components/styles/keyframes";
import { media } from "@components/styles/theme";
import {
    useRef,
    useCallback,
    useEffect,
    type FC,
    type MutableRefObject,
    type ReactNode,
} from "react";
import styled from "styled-components";

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
`;

const ModalContainer = styled.div`
    opacity: 1;
    position: relative;
    margin: 4rem;
    box-sizing: border-box;
`;

const ModalContent = styled.div`
    background-color: ${(p) => p.theme.color.backgroundColor};
    /* border: ${(p) => p.theme.border.active}; */
    box-shadow: ${(p) => p.theme.boxShadow.strong};
    border-radius: ${(p) => p.theme.border.radius};
    padding: 2.5rem;
    outline: none;
    width: 50vw;
    max-width: 100%;
    z-index: 21;
    ${media.tablet} {
        width: 80vw;
    }
    transition: ${(p) => p.theme.transition.fast};
    animation: ${uprise} 0.3s ease-in-out;
`;

const CloseBtn = styled.button`
    transition: ${(p) => p.theme.transition.fast};
    position: absolute;
`;

interface ModalProps {
    children?: ReactNode;
    handleClose: () => void;
}

const Modal: FC<ModalProps> = ({ handleClose, children }) => {
    const ref = useRef() as MutableRefObject<HTMLDivElement>; // for convey ref

    // call reducer & store in here, or getServerSideProps?

    const onClickClose = () => handleClose(); // close modal by using button
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
            //  lock body scrolling
            window.addEventListener("keydown", handleKeydownEscape);
        }

        return () => {
            // unlock body scrolling
            window.removeEventListener("keydown", handleKeydownEscape);
        };
    }, [handleKeydownEscape]);

    return (
        <RootContainer>
            <ModalContainer aria-modal ref={ref} data-testid={"modal"}>
                <CloseBtn
                    aria-label="Closing this modal button"
                    onClick={onClickClose}
                >
                    {/* Close SVG ICON */}
                </CloseBtn>
                <ModalContent tabIndex={-1}>{children}</ModalContent>
            </ModalContainer>
        </RootContainer>
    );
};

export default Modal;
