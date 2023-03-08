import { FC } from "react";
import { Image } from "../../../models";
import { getImage } from "../../../utils/getImage";
import styles from "./ImagePreview.module.css";

interface ImagePreviewProps {
  title: string;
  image: Image;
}

export const ImagePreview: FC<ImagePreviewProps> = ({ title, image }) => {
  let imageSrc = image && image.data.length ? getImage(image) : undefined;

  return imageSrc ? (
    <img alt={title} className={styles.image} src={imageSrc} />
  ) : (
    <img
      alt={title}
      className={styles.image}
      src="http://localhost:3000/no-image.png"
    />
  );
};
