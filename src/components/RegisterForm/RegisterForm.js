import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRef } from "react";
import { auth } from "../../auth/firebaseAuth";

const RegisterForm = () => {
  const registerEmailInputRef = useRef();
  const registerPasswordInputRef = useRef();

  const registerAccountHandler = async (event) => {
    const registerEmailInput = registerEmailInputRef.current.value;
    const registerPasswordInput = registerPasswordInputRef.current.value;

    event.preventDefault();
    createUserWithEmailAndPassword(
      auth,
      registerEmailInput,
      registerPasswordInput
    )
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  return (
    <div>
      <div>
        <label htmlFor="email">Email</label>
        <input ref={registerEmailInputRef} type="email" id="email"></input>
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          ref={registerPasswordInputRef}
          type="password"
          id="password"
        ></input>
      </div>
      <button onClick={registerAccountHandler}>Create Account</button>
    </div>
  );
};

export default RegisterForm;
