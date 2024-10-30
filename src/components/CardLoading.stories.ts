import { Meta, StoryFn } from "@storybook/vue3/*";
import CardLoading from "./CardLoading.vue";

// export const oneItem = {
//     quantity: 1,
//     parameters: {
//         backgrounds: {
//           default: 'Dark',
//         },
//     },
// };

// export const twoItem: PropsCardLoading = {
//     quantity: 2
// };

// export default {
//     title: 'Components/CardLoading',
//     component: CardLoading,
//     tags: ['autodocs'],
//     args: {
//         oneItem,
//         twoItem
//     }
// }

// // export default preview;
// type Story = StoryObj<typeof CardLoading>;

// export const OnDark: Story = {
//   parameters: {
//     backgrounds: {
//       default: 'Dark',
//     },
//   },
// };


export default {
    title: 'Components/CardLoading',
    component: CardLoading,
    argTypes: {
      quantity: { control: { type: 'number', min: 1, max: 20 } },
    },
    parameters: {
        backgrounds: {
            default: 'Dark',
        },
    }
} as Meta;

const Template = (args) => ({
    components: { CardLoading },
    setup() {
      return { args };
    },
    template: '<CardLoading v-bind="args" />',
});

  export const Default: StoryFn = Template.bind({});
  Default.args = {
    quantity: 6,
  };

  export const CustomQuantity: StoryFn = Template.bind({});
  CustomQuantity.args = {
    quantity: 10,
  };
