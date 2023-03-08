import { faCrown, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { FC, useContext, useEffect, useState } from "react";
import { useJwt } from "react-jwt";
import { IconButton, Pagination } from "../../../components";
import { ButtonTypeEnum } from "../../../enums/button.enum";
import { RoleEnum } from "../../../enums/role.enum";
import { UserProfile } from "../../../models";
import { PaginatedUsers } from "../../../models/pagination.module";
import { UserContext } from "../../../store";
import { getUsersList } from "../../../utils/getUsers";
import styles from "./Admin.module.css";

export const Admin: FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [list, setList] = useState<UserProfile[]>([]);
  const [total, setTotal] = useState<number>(0);
  const userContext = useContext(UserContext);
  const decodedToken = useJwt(userContext.token).decodedToken as UserProfile;

  const handlePageChange = (val: number) => {
    setCurrentPage(val);
  };

  const listUsers = async () => {
    const response = await getUsersList({
      currentPage,
      token: userContext.token,
    });

    setList(response.users);
    setTotal(response.total);
  };

  const handleChangeUserRole = async (role: RoleEnum, id: string) => {
    await fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/admin-users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: userContext.token,
      },
      body: JSON.stringify({ role }),
    }).then(async () => {
      listUsers();
    });
  };

  const handleDeleteUser = async (id: string) => {
    await fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/admin-users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: userContext.token,
      },
    }).then(async () => {
      listUsers();
    });
  };

  useEffect(() => {
    const listFetchUsers = async () => {
      const response: PaginatedUsers = await getUsersList({
        currentPage,
        token: userContext.token,
      });

      setList(response.users);
      setTotal(response.total);
    };

    listFetchUsers();
  }, [userContext.token, currentPage]);

  return (
    <div className={styles.container}>
      <h2>Admin</h2>
      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <div className={styles.text}>Usernme</div>
          <div className={styles.text}>Role</div>
          <div className={styles.text}>Actions</div>
        </div>
        {list.map((user: UserProfile) => {
          const isAdmin = user.role === RoleEnum.ADMINISTRATOR;
          return (
            <div key={user.id} className={styles.tableBody}>
              <div className={styles.text}>{user.username}</div>
              <div className={styles.text}>{user.role}</div>
              <div className={styles.actions}>
                {user.id !== decodedToken.id && (
                  <>
                    <IconButton
                      icon={isAdmin ? faUser : faCrown}
                      type={ButtonTypeEnum.PRIMARY}
                      onClick={() =>
                        handleChangeUserRole(
                          isAdmin ? RoleEnum.USER : RoleEnum.ADMINISTRATOR,
                          user.id
                        )
                      }
                    />
                    <IconButton
                      icon={faTrash}
                      type={ButtonTypeEnum.DANGER}
                      onClick={() => handleDeleteUser(user.id)}
                    />
                  </>
                )}
              </div>
            </div>
          );
        })}
        <Pagination
          pages={Math.ceil(total / 10)}
          current={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};
