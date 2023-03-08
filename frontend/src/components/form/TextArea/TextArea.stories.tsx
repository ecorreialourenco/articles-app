import { ComponentMeta } from "@storybook/react";
import { TextArea } from "./TextArea";
import { useState } from "@storybook/client-api";

export default {
  title: "TextArea",
  component: TextArea,
  args: {
    rows: 4,
    cols: 50,
  },
} as ComponentMeta<typeof TextArea>;

export const Playground = ({ ...args }) => {
  const [value, setValue] = useState<string>("");

  return (
    <div>
      <TextArea
        label="Some label"
        name="textArea"
        value={value}
        onChange={setValue}
      />
    </div>
  );
};
