import { auth } from "../../config/firebase-config";
import { signOut } from "firebase/auth";

export const AuthorizedUser = () => {
  const user = localStorage.getItem("auth");

  async function logout() {
    await signOut(auth);
    localStorage.removeItem("auth");
    console.log("User logged out");
    window.location.reload();
  }

  return (
    <div>
      <p> user {user.email} is authorized </p>
      <button onClick={logout}> logout </button>
    </div>
  );
};
