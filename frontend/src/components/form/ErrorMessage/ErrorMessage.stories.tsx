import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ErrorMessage } from "./ErrorMessage";

export default {
  title: "ErrorMessage",
  component: ErrorMessage,
} as ComponentMeta<typeof ErrorMessage>;

const Template: ComponentStory<typeof ErrorMessage> = (args) => (
  <ErrorMessage {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
  message: "Some error",
};
