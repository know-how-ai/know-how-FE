import { type Variants, motion } from "framer-motion";
import { Svg } from "./IconSvg";
import type { IconProps } from "./iconTypes";
import { useUISelector } from "@contexts/uiSlice";
import { darkTheme, lightTheme } from "@components/styles/theme";
import { useMemo } from "react";
import type { DefaultTheme } from "styled-components";

const DocumentIcon = ({ strokeColor, strokeWidth, act }: IconProps) => {
    const { isDarkmode } = useUISelector((state) => state.ui);

    const currentTheme = useMemo<DefaultTheme>(
        () => (isDarkmode ? darkTheme : lightTheme),
        [isDarkmode]
    );

    const variants = useMemo<Variants>(
        () => ({
            hidden: {
                pathLength: 0,
                stroke: currentTheme.color.textColor + "00",
                transform: "translateY(0.6rem)",
            },
            visible: {
                pathLength: 1,
                stroke: currentTheme.color.textColor,
                transition: { type: "spring", duration: 1.5 },
                transform: "translateY(-0.1rem)",
            },
        }),
        [currentTheme]
    );

    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={strokeWidth}
            strokeColor={strokeColor}
        >
            <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                variants={variants}
                initial="hidden"
                animate={act ? "visible" : "hidden"}
            />
        </Svg>
    );
};

export default DocumentIcon;
