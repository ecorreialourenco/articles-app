interface GetArticlesList {
  selectedCategory: string;
  token: string;
  tab: string;
}

export const getArticlesList = (params: GetArticlesList) => {
  const { selectedCategory, token, tab } = params;

  return async (page: number) => {
    await fetch(
      `${process.env.REACT_APP_BACKEND_ENDPOINT}/${tab}?page=${page}${
        selectedCategory ? `&category=${selectedCategory}` : ""
      }`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    ).then(async (response: Response) => await response.json());
  };
};
