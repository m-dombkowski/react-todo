import React, { Fragment } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./context/user-context";
import { SettingsMenuProvider } from "./context/settingsMenu-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Fragment>
    <SettingsMenuProvider>
      <UserContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserContextProvider>
    </SettingsMenuProvider>
  </Fragment>
);
