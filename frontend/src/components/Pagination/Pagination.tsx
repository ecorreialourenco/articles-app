import { FC } from "react";
import { ButtonTypeEnum } from "../../enums/button.enum";
import { Button } from "../form";
import styles from "./Pagination.module.css";

interface PaginationProps {
  pages: number;
  current: number;
  onPageChange: (page: number) => void;
}

export const Pagination: FC<PaginationProps> = ({
  pages,
  current,
  onPageChange,
}) => {
  const addButton = (number: number, currentPage: number) => {
    return (
      <Button
        key={number}
        type={
          number === currentPage
            ? ButtonTypeEnum.SECONDARY
            : ButtonTypeEnum.PRIMARY
        }
        label={`${number + 1}`}
        onClick={() => onPageChange(number)}
      />
    );
  };

  const Buttons = () => {
    const component = [
      <Button
        type={ButtonTypeEnum.PRIMARY}
        key="<<"
        label="<<"
        onClick={() => onPageChange(0)}
        disabled={current === 0}
      />,
      <Button
        type={ButtonTypeEnum.PRIMARY}
        key="<"
        label="<"
        onClick={() => onPageChange(current - 1)}
        disabled={current === 0}
      />,
    ];
    if (pages < 6) {
      for (let i = 0; i < pages; i++) {
        component.push(addButton(i, current));
      }
    } else {
      // Always show the first page
      component.push(addButton(0, current));

      current > 2 && component.push(<div key="firstDots">...</div>);

      if (current === 0) {
        for (let i = current + 1; i < current + 3; i++) {
          component.push(addButton(i, current));
        }
      }

      if (current > 0 && current < 2) {
        for (let i = current; i < current + 2; i++) {
          component.push(addButton(i, current));
        }
      }

      if (current >= 2 && current < 3) {
        for (let i = current - 1; i < current + 2; i++) {
          component.push(addButton(i, current));
        }
      }

      if (current >= 3 && current < pages - 3) {
        for (let i = current - 1; i < current + 2; i++) {
          component.push(addButton(i, current));
        }
      }

      if (current > pages - 4 && current < pages - 1) {
        for (let i = current - 1; i < pages - 1; i++) {
          component.push(addButton(i, current));
        }
      }

      if (current === pages - 1) {
        for (let i = current - 2; i < pages - 1; i++) {
          component.push(addButton(i, current));
        }
      }

      current + 3 < pages && component.push(<div key="lastDots">...</div>);

      // Show last page
      if (pages > 1) {
        component.push(addButton(pages - 1, current));
      }
    }

    component.push(
      <Button
        type={ButtonTypeEnum.PRIMARY}
        key=">"
        label=">"
        onClick={() => onPageChange(current + 1)}
        disabled={current >= pages - 1}
      />
    );
    component.push(
      <Button
        type={ButtonTypeEnum.PRIMARY}
        key=">>"
        label=">>"
        onClick={() => onPageChange(pages - 1)}
        disabled={current >= pages - 1}
      />
    );

    return component;
  };

  return <div className={styles.pagination}>{Buttons()}</div>;
};
