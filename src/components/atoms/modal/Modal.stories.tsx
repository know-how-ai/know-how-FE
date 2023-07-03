import type { Meta, StoryObj } from "@storybook/react";
import Modal from "./Modal";
import { TextboxWithLabel } from "@components/molecules";

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
                <TextboxWithLabel
                    label="Name"
                    currentValue="Valentine Chocolate"
                />
                <TextboxWithLabel label="Flavor" currentValue="Chocolate" />
            </div>
        ),
    },
};
