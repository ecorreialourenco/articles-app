import { Image } from "../models";

export const getImage = (buffer: Image) => {
  let binary = "";
  let bytes = new Uint8Array(buffer.data);

  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  return binary;
};
