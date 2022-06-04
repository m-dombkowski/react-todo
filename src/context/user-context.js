import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const UserContext = React.createContext({
  currentUser: "",
  isLoggedIn: false,
  form: false,
  hideFooter: () => {},
  showFooter: () => {},
});

export const UserContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isForm, setIsForm] = useState(false);

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

  const hideFooter = () => {
    setIsForm(true);
  };

  const showFooter = () => {
    setIsForm(false);
  };

  const contextValue = {
    currentUser: currentUser,
    isLoggedIn: isLoggedIn,
    form: isForm,
    hideFooter,
    showFooter,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
