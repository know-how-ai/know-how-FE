import type { Meta, StoryObj } from "@storybook/react";
import Modal from "./Modal";
import { LabelWrapper } from "@components/molecules";

const meta = {
    component: Modal,
    // tags: ["autodocs"],
} satisfies Meta<typeof Modal>;

export default meta;

type ModalStory = StoryObj<typeof Modal>;

export const Base: ModalStory = {
    args: {
        children: (
            <div style={{ padding: "4rem 0.5rem" }}>
                <LabelWrapper label="Name" currentValue="Valentine Chocolate" />
                <LabelWrapper label="Flavor" currentValue="Chocolate" />
            </div>
        ),
    },
};
