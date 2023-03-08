import { FC } from "react";
import { ButtonTypeEnum } from "../../../enums/button.enum";
import { CategoryEnum } from "../../../enums/category.enum";
import { Button } from "../../form";
import styles from "./ArticleFilters.module.css";

interface ArticleFiltersProps {
  selectedCategory: string | null;
  setSelectedCategory: (value: string | null) => void;
}

export const ArticleFilters: FC<ArticleFiltersProps> = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  const categoryOptions = (
    Object.keys(CategoryEnum) as Array<keyof typeof CategoryEnum>
  ).map((key) => {
    return {
      value: key,
      label: CategoryEnum[key],
    };
  });

  return (
    <div className={styles.container}>
      Categories:
      {categoryOptions.map((category) => (
        <Button
          key={category.value}
          label={category.label}
          onClick={() =>
            setSelectedCategory(
              category.label === selectedCategory ? null : category.label
            )
          }
          type={
            selectedCategory === category.label
              ? ButtonTypeEnum.SECONDARY
              : ButtonTypeEnum.PRIMARY
          }
        />
      ))}
    </div>
  );
};
