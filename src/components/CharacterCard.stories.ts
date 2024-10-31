import { fn } from "@storybook/test";
import { Meta, StoryObj } from "@storybook/vue3/*";
import CharacterCard from "./CharacterCard.vue";

const meta: Meta<typeof CharacterCard> = {
    title: 'Design System/Components/CharacterCard',
    component: CharacterCard,
    render: (args) => ({
        components: { CharacterCard },
        setup() {
            return { args };
        },
        template: '<CharacterCard v-bind="args" />',
    }),
    parameters: {
        actions: { argTypesRegex: '^on.*' },
    },
    args: {
        onOpen: fn(),
    },
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args : {
        id: 1232,
        /** Nome da especie exibida no titulo do card */
        name: "Aqua Morty",
        species: "Humanoid",
        image : "https://rickandmortyapi.com/api/character/avatar/21.jpeg",
        altImage: "Aqua Morty",
    },
};

