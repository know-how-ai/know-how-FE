import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        color: {
            purple: string;
            blue: string;
            gray: string;
            green: string;
            lightGreen: "#99ecdd";
            midGreen: "#00a07f";
            darkGray: string;
            backgroundColor: string;
            textColor: string;
            transparent: "transparent";
            red: "#df4558";
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
            active: "2px solid #99ecdd;";
            nonActive: "2px solid transparent;" | string;
            radius: "1rem";
        };
    }
}
