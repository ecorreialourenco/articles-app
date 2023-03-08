interface GetUsersList {
  currentPage: number;
  token: string;
}

export const getUsersList = async (params: GetUsersList) => {
  const { currentPage, token } = params;

  return await fetch(
    `${process.env.REACT_APP_BACKEND_ENDPOINT}/admin-users?page=${currentPage}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  ).then(async (response: Response) => await response.json());
};
