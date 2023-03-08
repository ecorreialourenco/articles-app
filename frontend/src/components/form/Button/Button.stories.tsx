import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Button } from "./Button";
import { ButtonTypeEnum } from "../../../enums/button.enum";

export default {
  title: "Button",
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  label: "Button",
  type: ButtonTypeEnum.PRIMARY,
  disabled: false,
};
