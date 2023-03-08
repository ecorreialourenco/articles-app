export const getArticleById = async (id: string, token: string) =>
  await fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/article/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  })
    .then(async (response: Response) => await response.json())
    .catch((error) => console.log(error));
