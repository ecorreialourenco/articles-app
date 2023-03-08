import { ComponentStory, ComponentMeta } from "@storybook/react";
import { InputPassword } from "./InputPassword";

export default {
  title: "InputPassword",
  component: InputPassword,
} as ComponentMeta<typeof InputPassword>;

const Template: ComponentStory<typeof InputPassword> = (args) => (
  <InputPassword {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
  label: "Some label",
  name: "name",
  value: "some password",
};
