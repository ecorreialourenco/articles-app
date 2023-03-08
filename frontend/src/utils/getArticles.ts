interface GetMyArticles {
  path: string;
  page: number;
  category?: string | null;
  search?: string;
  token: string;
}

export const getArticles = async (params: GetMyArticles) => {
  const { path, page, category, search, token } = params;

  return await fetch(
    `${process.env.REACT_APP_BACKEND_ENDPOINT}/${path}?page=${page}${
      category ? `&category=${category}` : ""
    }${search ? `&search=${search}` : ""}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  ).then(async (response: Response) => await response.json());
};
