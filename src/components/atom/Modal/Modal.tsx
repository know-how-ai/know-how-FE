import { media } from "@/components/styles/theme";
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
    opacity: 0.7;
    filter: ${(p) => p.theme.filter.blur};
    z-index: 20;
    inset: 0;
`;

const ModalContainer = styled.div`
    position: relative;
    padding: 2.5rem;
`;

const ModalContent = styled.div`
    outline: none;
    width: 80vw;
    max-width: 100%;
    background-color: ${(p) => p.theme.color.backgroundColor};
    z-index: 21;
    ${media.mobile} {
        width: 90vw;
    }
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
            if (e.key === "Escape") {
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
            <ModalContainer aria-modal ref={ref}>
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
