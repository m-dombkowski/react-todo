import React, { useState } from "react";

const SettingsMenuContext = React.createContext({
  menuVisible: true,
  hideMenu: () => {},
  showMenu: () => {},
});

export const SettingsMenuProvider = (props) => {
  const [menu, setMenu] = useState(true);

  const hideMenu = () => {
    setMenu(false);
  };

  const showMenu = () => {
    setMenu(true);
  };

  const contextValue = {
    menuVisible: menu,
    hideMenu: hideMenu,
    showMenu: showMenu,
  };

  return (
    <SettingsMenuContext.Provider value={contextValue}>
      {props.children}
    </SettingsMenuContext.Provider>
  );
};

export default SettingsMenuContext;
