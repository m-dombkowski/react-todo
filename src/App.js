import "./App.css";

import Navigation from "./ui/Navigation/Navigation";

import Footer from "./ui/Footer/Footer";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import { Fragment, useContext } from "react";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import WelcomePage from "./pages/MainPage/MainPage";

import AuthenticationModal from "./components/ReAuthenticateUserModal/AuthenticationModal";
import UserSettingsPage from "./pages/UserSettingsPage/UserSettingsPage";
import UserContext from "./context/user-context";
import ChangeEmailForm from "./components/ChangeEmailForm/ChangeEmailForm";
import ChangePasswordForm from "./components/ChangePasswordForm/ChangePasswordForm";

function App() {
  const userContext = useContext(UserContext);

  return (
    <Fragment>
      <Navigation />
      <Routes>
        <Route path="/" element={<WelcomePage replace to="/welcome" />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="settings" element={<UserSettingsPage />}>
          <Route path="email" element={<ChangeEmailForm />}>
            <Route path="reauthenticate" element={<AuthenticationModal />} />
          </Route>
          <Route path="password" element={<ChangePasswordForm />}>
            <Route path="reauthenticate" element={<AuthenticationModal />} />
          </Route>
        </Route>
      </Routes>
      {!userContext.isLoggedIn && <Footer />}
    </Fragment>
  );
}

export default App;
