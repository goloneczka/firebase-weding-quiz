import React from "react";
import { auth, provider } from "../../config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import storageService from "../../service/local-storage-service";

export const Auth = () => {
  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    const authInfo = { id: result.user.uid, mail: result.user.email };
    storageService.setUserAuth(authInfo);
  };

  return (
    <div>
      <p> Login with Google </p>
      <button onClick={signInWithGoogle}> Sign in with Google </button>
    </div>
  );
};
