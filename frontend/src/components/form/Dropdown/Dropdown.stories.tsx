import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Dropdown } from "./Dropdown";

export default {
  title: "Dropdown",
  component: Dropdown,
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => (
  <Dropdown {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
  label: "Button",
  options: [
    { value: "1", label: "1st Option" },
    { value: "2", label: "2nd Option" },
  ],
};
