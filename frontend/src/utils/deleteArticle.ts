export const deleteArticle = async (id: string, token: string) =>
  await fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/articles/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  })
    .then(async (response: Response) => await response.json())
    .catch((error) => console.log(error));
