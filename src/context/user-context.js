import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const UserContext = React.createContext({
  currentUser: "",
  isLoggedIn: false,
});

export const UserContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userEmail = user.email;

        setCurrentUser(userEmail);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, [auth]);

  const contextValue = {
    currentUser: currentUser,
    isLoggedIn: isLoggedIn,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
