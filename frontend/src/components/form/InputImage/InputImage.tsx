import { FC, useEffect, useState } from "react";
import { ButtonTypeEnum } from "../../../enums/button.enum";
import { InputImageProps } from "../../../models";
import { getImage } from "../../../utils/getImage";
import { Button } from "../Button";
import styles from "./InputImage.module.css";

export const InputImage: FC<InputImageProps> = ({ label, value, onChange }) => {
  const [selectedImage, setSelectedImage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = e.target.files;

    if (files?.length) {
      const file = files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        setSelectedImage(reader.result as string);
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
    }
  };

  useEffect(() => {
    selectedImage && onChange(selectedImage);
  }, [selectedImage, onChange]);

  useEffect(() => {
    if (value && !selectedImage) {
      const imageSrc = getImage(value);
      setSelectedImage(imageSrc);
    } else if (!value) {
      setSelectedImage("");
    }
  }, [value, selectedImage]);

  return (
    <div className={styles.container}>
      <span className={styles.label}>{label}</span>
      {selectedImage ? (
        <>
          <img alt="not found" width={"250px"} src={selectedImage} />
          <Button
            label="Remove"
            onClick={() => setSelectedImage("")}
            type={ButtonTypeEnum.PRIMARY}
          />
        </>
      ) : (
        <input type="file" name="myImage" onChange={handleChange} />
      )}
    </div>
  );
};
