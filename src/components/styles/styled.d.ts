import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        color: {
            light: string;
            gray: string;
            lightBlue: "#e8eaf9";
            blue: "#2350ce";
            darkBlue: "#002099";
            darkGray: string;
            backgroundColor: string;
            textColor: string;
            transparent: "transparent";
            componentBgColor: string;
            red: "#df4558";
            orange: "#f0620c";
            darkOrange: "#ca4e00";
        };
        boxShadow: {
            normal: "0 3px 8px 0 rgb(0 0 0 / 15%)";
            strong: "0 3px 24px 0 rgb(0 0 0 / 30%)";
            purple: "0 3px 8px 0 #d6c9ff";
            blue: "0 3px 8px 0 #b3e2e6";
        };
        filter: {
            blur: "blur(70%);";
        };
        transition: {
            fast: "all 0.3s ease-in-out;";
        };
        border: {
            active: "2px solid #2350ce;" | string;
            inactive: "2px solid transparent;" | string;
            radius: "1rem";
        };
    }
}
