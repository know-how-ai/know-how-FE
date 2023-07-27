import { Svg } from "./IconSvg";
import { IconProps } from "./iconTypes";

const CloseIcon = ({ strokeColor, strokeWidth: strokeWitdh }: IconProps) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={strokeWitdh}
            strokeColor={strokeColor}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
            />
        </Svg>
    );
};

export default CloseIcon;
