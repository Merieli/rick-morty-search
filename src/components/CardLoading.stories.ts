import { Meta, StoryObj } from "@storybook/vue3/*";
import CardLoading from "./CardLoading.vue";

const meta: Meta<typeof CardLoading> = {
    title: 'Design System/Components/CardLoading',
    component: CardLoading,
    render: (args) => ({
        components: { CardLoading },
        setup() {
            return { args };
        },
        template: '<CardLoading v-bind="args" />',
    }),
    argTypes: {
        quantity: { control: { type: 'number', min: 1, max: 20 } },
    },
    parameters: {
        actions: { argTypesRegex: '^on.*' },
        backgrounds: {
            default: 'Dark',
        },
    }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args : {
        quantity: 1,
    },
    parameters: { a11y: { disable: true }, }
};

export const CustomQuantity:Story = {
    args: {
        quantity: 10,
    }
};
