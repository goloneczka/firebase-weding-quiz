import { AuthorizedUser } from "./loged-user";
import { UserToAuthorize } from "./user-to-authorize";

export const UserContainer = () => {
  const isLoggedIn = !!localStorage.getItem("auth");

  return <>{isLoggedIn ? <AuthorizedUser /> : <UserToAuthorize />}</>;
};
