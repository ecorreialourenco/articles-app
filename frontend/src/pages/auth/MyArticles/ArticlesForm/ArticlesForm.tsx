import { FC, useContext, useEffect, useReducer } from "react";
import { Button, Dropdown, Input, TextArea } from "../../../../components/form";
import { InputImage } from "../../../../components/form/InputImage/InputImage";
import { ArticleTypeEnum } from "../../../../enums/articleType.enum";
import { ButtonTypeEnum } from "../../../../enums/button.enum";
import { CategoryEnum } from "../../../../enums/category.enum";
import { Image } from "../../../../models";
import { ArticlesResponse } from "../../../../models/response";
import { UserContext } from "../../../../store";
import { getArticleById } from "../../../../utils/getArticleById";
import styles from "./ArticlesForm.module.css";

interface ArticleModel {
  title: string;
  description: string;
  image: Image | string;
  category: string;
  content: string;
}

interface ArticleFormProps {
  id?: string;
  onClose: () => void;
  updateList: () => void;
}

const intialState: ArticleModel = {
  title: "",
  description: "",
  image: "",
  category: CategoryEnum.MARKETING,
  content: "",
};

export const ArticlesForm: FC<ArticleFormProps> = ({
  id,
  onClose,
  updateList,
}) => {
  const [data, setData] = useReducer(
    (state: ArticleModel, newState: Partial<ArticleModel>) => ({
      ...state,
      ...newState,
    }),
    intialState
  );
  const userContext = useContext(UserContext);
  const disabledSubmitButtons =
    !data.title || !data.description || !data.content;

  const categoryOptions = (
    Object.keys(CategoryEnum) as Array<keyof typeof CategoryEnum>
  ).map((key) => {
    return {
      value: CategoryEnum[key],
      label: CategoryEnum[key],
    };
  });

  const handleChange = (value: string, name: string) => {
    setData({ [name]: value });
  };

  const handleChangeImage = (value: Image | string) => {
    data.image !== value && setData({ image: value });
  };

  const handleSubmit = async (type: ArticleTypeEnum) => {
    const method = id ? "put" : "post";

    await fetch(
      `${process.env.REACT_APP_BACKEND_ENDPOINT}/articles${id ? `/${id}` : ""}`,
      {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: userContext.token,
        },
        body: JSON.stringify({ ...data, type }),
      }
    ).then(() => {
      updateList();
      setData(intialState);
      // Close form after submit successfully
      onClose();
    });
  };

  useEffect(() => {
    const getMyArticle = async () => {
      const response: ArticlesResponse = await getArticleById(
        id!,
        userContext.token
      );
      const { title, description, category, image, content } = response.article;

      setData({ title, description, category, image: image || "", content });
    };

    id ? getMyArticle() : setData(intialState);
  }, [id, userContext.token]);

  return (
    <div>
      <Input
        name="title"
        label="Title"
        value={data.title}
        onChange={handleChange}
        placeholder="Your title"
      />
      <TextArea
        label="Small Description"
        name="description"
        value={data.description}
        rows={4}
        onChange={handleChange}
      />
      <InputImage
        label="Image"
        value={data.image as Image}
        onChange={handleChangeImage}
      />
      <Dropdown
        label="Category"
        name="category"
        value={data.category}
        options={categoryOptions}
        onChange={handleChange}
      />
      <TextArea
        label="Content"
        name="content"
        value={data.content}
        rows={10}
        onChange={handleChange}
      />
      <div className={styles.actionButtons}>
        <Button label="Cancel" onClick={onClose} type={ButtonTypeEnum.INFO} />
        <Button
          label="Save"
          onClick={() => handleSubmit(ArticleTypeEnum.DRAFT)}
          type={ButtonTypeEnum.PRIMARY}
          disabled={disabledSubmitButtons}
        />
        <Button
          label="Publish"
          onClick={() => handleSubmit(ArticleTypeEnum.PUBLISHED)}
          type={ButtonTypeEnum.SECONDARY}
          disabled={disabledSubmitButtons}
        />
      </div>
    </div>
  );
};
