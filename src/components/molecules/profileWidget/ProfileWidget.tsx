import { CircleButton, UserIcon } from "@components/atoms";

interface ProfileWidgetProps {
    onModal?: Function;
}

const ProfileWidget = ({ onModal }: ProfileWidgetProps) => {
    return (
        <CircleButton data-testid={"sign button"} onClick={onModal}>
            <UserIcon />
        </CircleButton>
    );
};

export default ProfileWidget;
