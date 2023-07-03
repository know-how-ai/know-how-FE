import { DefaultTheme } from "styled-components";

export const lightTheme: DefaultTheme = {
    color: {
        gray: "#777777",
        lightBlue: "#e8eaf9",
        blue: "#2350ce",
        darkBlue: "#002099",
        darkGray: "#5e5d5f",
        backgroundColor: "#fefffd",
        componentBgColor: "fefffd",
        textColor: "#202020",
        transparent: "transparent",
        red: "#df4558",
        light: "#fefffd",
        orange: "#f0620c",
        darkOrange: "#ca4e00",
    },
    boxShadow: {
        normal: "0 3px 8px 0 rgb(0 0 0 / 15%)",
        strong: "0 3px 24px 0 rgb(0 0 0 / 30%)",
        purple: "0 3px 8px 0 #d6c9ff",
        blue: "0 3px 8px 0 #b3e2e6",
    },
    filter: {
        blur: "blur(70%);",
    },
    transition: {
        fast: "all 0.3s ease-in-out;",
    },
    border: {
        active: "2px solid #2350ce;",
        inactive: "2px solid transparent;",
        radius: "1rem",
        gray: "2px solid #777777;",
    },
    size: {
        xs: "0.5rem",
        sm: "1rem",
        md: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
    },
};

export const darkTheme: DefaultTheme = {
    color: {
        gray: "#777777",
        lightBlue: "#e8eaf9",
        blue: "#2350ce",
        darkBlue: "#002099",
        darkGray: "#5e5d5f",
        backgroundColor: "#202020",
        componentBgColor: "5e5d5f",
        textColor: "#fefffd",
        transparent: "transparent",
        red: "#df4558",
        light: "#fefffd",
        orange: "#f0620c",
        darkOrange: "#ca4e00",
    },
    boxShadow: {
        normal: "0 3px 8px 0 rgb(0 0 0 / 15%)",
        strong: "0 3px 24px 0 rgb(0 0 0 / 30%)",
        purple: "0 3px 8px 0 #d6c9ff",
        blue: "0 3px 8px 0 #b3e2e6",
    },
    filter: {
        blur: "blur(70%);",
    },
    transition: {
        fast: "all 0.3s ease-in-out;",
    },
    border: {
        active: "2px solid #2350ce;",
        inactive: "2px solid transparent;",
        radius: "1rem",
        gray: "2px solid #777777;",
    },
    size: {
        xs: "0.5rem",
        sm: "1rem",
        md: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
    },
};

const customMediaQuery = (maxWidth: number): string =>
    `@media (max-width: ${maxWidth}px)`;

export const media = {
    custom: customMediaQuery,
    pc: customMediaQuery(1440),
    tablet: customMediaQuery(768),
    mobile: customMediaQuery(576),
};
