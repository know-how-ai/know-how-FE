import type { Meta, StoryObj } from "@storybook/react";
import Table from "./Table";

const meta = {
    component: Table,
    tags: ["autodocs"],
} satisfies Meta<typeof Table>;

export default meta;

type TableStory = StoryObj<typeof Table>;

const titleRow = ["title1", "title2", "title3"];
const contentRows = [
    ["content0_1", "content0_2", "content0_3"],
    ["content1_1", "content1_2", "content1_3"],
    ["content2_1", "content2_2", "content2_3"],
];

export const Base: TableStory = {
    args: {
        titleRow,
        contentRows,
    },
};
