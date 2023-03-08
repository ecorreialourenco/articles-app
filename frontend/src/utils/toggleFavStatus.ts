interface ToggleFavStatus {
  id: string;
  token: string;
}

export const addFavStatus = async (params: ToggleFavStatus) => {
  const { id, token } = params;

  return await fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/favorites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ id }),
  })
    .then(async (response: Response) => await response.json())
    .catch((error) => console.log(error));
};

export const removeFavStatus = async (params: ToggleFavStatus) => {
  const { id, token } = params;

  return await fetch(
    `${process.env.REACT_APP_BACKEND_ENDPOINT}/favorites/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  )
    .then(async (response: Response) => await response.json())
    .catch((error) => console.log(error));
};
