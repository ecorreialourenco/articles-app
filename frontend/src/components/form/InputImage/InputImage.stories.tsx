import { ComponentMeta } from "@storybook/react";
import { InputImage } from "./InputImage";
import { useState } from "@storybook/client-api";
import { Image } from "../../../models";

export default {
  title: "InputImage",
  component: InputImage,
} as ComponentMeta<typeof InputImage>;

export const Playground = ({ ...args }) => {
  const [value, setValue] = useState<Image | string>("");

  return (
    <div style={{ width: 200 }}>
      <InputImage
        label="Some label"
        value={value as Image}
        onChange={setValue}
      />
    </div>
  );
};
