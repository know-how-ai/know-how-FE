import type { Meta, StoryObj } from "@storybook/react";
import ToolTip from "./ToolTip";

const meta = {
    component: ToolTip,
    tags: ["autodocs"],
} satisfies Meta<typeof ToolTip>;

export default meta;

type ToolTipStory = StoryObj<typeof ToolTip>;

const contents: string[] = [
    "타이틀이에요.",
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit.\nModi suscipit quo reiciendis,\nat a aperiam fugiat molestiae,\nculpa veritatis alias quasi quia eligendi tempora ducimus dolorum commodi.",
    "감사합니다.",
];

export const Base: ToolTipStory = {
    args: {
        contents,
    },
    decorators: [
        (story) => (
            <div style={{ width: "100%", height: "100%" }}>{story()}</div>
        ),
    ],
};
