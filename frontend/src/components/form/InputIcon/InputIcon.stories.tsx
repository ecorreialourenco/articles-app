import { faUser } from "@fortawesome/free-solid-svg-icons";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { InputIcon } from "./InputIcon";

export default {
  title: "InputIcon",
  component: InputIcon,
} as ComponentMeta<typeof InputIcon>;

const Template: ComponentStory<typeof InputIcon> = (args) => (
  <InputIcon {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
  label: "Some label",
  name: "name",
  placeholder: "Placeholder",
  value: "",
  icon: faUser,
};
