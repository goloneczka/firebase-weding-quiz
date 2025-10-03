import { auth, provider } from "../../config/firebase-config";
import { signInWithPopup } from "firebase/auth";

export const UserToAuthorize = () => {
  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    const authInfo = { id: result.user.uid, mail: result.user.email };
    localStorage.setItem("auth", JSON.stringify(authInfo));
    window.location.reload();
  };

  return (
    <div>
      <p> Login with Google </p>
      <button onClick={signInWithGoogle}> Sign in with Google </button>
    </div>
  );
};
