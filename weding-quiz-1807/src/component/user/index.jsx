import { getFunctions, httpsCallable } from "firebase/functions";
import { useEffect } from "react";

export const LoggedUserContainer = () => {
  useEffect(() => {
    httpsCallable(getFunctions(), "helloWorld")().then((restult) => {
      console.log(restult);
    });
  }, []);

  return <div>QuizContainer</div>;
};
