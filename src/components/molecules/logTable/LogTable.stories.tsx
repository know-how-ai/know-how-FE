import type { Meta, StoryObj } from "@storybook/react";
import LogTable from "./LogTable";

const meta = {
    component: LogTable,
    tags: ["autodocs"],
} satisfies Meta<typeof LogTable>;

export default meta;

type LogTableStory = StoryObj<typeof LogTable>;

const logs = [
    { createdAt: Date.now() - 2000, comment: "최초 로그인", amount: 10 },
    { createdAt: Date.now() - 20000, comment: "자소서 첨삭 봇", amount: -1 },
    { createdAt: Date.now() - 200000, comment: "면접 코칭 봇", amount: -1 },
    { createdAt: Date.now() - 2000000, comment: "면접 코칭 봇", amount: -1 },
    { createdAt: Date.now() - 4000000, comment: "면접 코칭 봇", amount: -1 },
];

export const Base: LogTableStory = {
    args: {
        logs,
    },
};
