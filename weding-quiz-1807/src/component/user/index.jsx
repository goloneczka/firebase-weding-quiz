import storageService from "../../service/local-storage-service";
import { AuthorizedUser } from "./logged/loged-user";
import { UserToAuthorize } from "./user-to-authorize";

export const UserContainer = () => {
  const isLoggedIn = storageService.validateUserAuth();

  return <>{isLoggedIn ? <AuthorizedUser /> : <UserToAuthorize />}</>;
};
