import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Input } from "./Input";

export default {
  title: "Input",
  component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  label: "Some label",
  name: "name",
  placeholder: "Placeholder",
  value: "",
};
