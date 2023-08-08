import { Modal } from "@components/atoms";
import { LoginOrJoinForm } from "@components/molecules";

interface AuthModalInterface {
    onSuccess: Function;
    onError: Function;
    handleClose: Function;
}

const AuthModal = ({ handleClose, onSuccess, onError }: AuthModalInterface) => {
    return (
        <Modal handleClose={handleClose}>
            <LoginOrJoinForm onSuccess={onSuccess} onError={onError} />
        </Modal>
    );
};

export default AuthModal;
