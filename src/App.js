import "./App.css";

import Navigation from "./ui/Navigation/Navigation";

import Footer from "./ui/Footer/Footer";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import { Fragment } from "react";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import WelcomePage from "./pages/MainPage/MainPage";

function App() {
  return (
    <Fragment>
      <Navigation />
      <Routes>
        <Route path="/" element={<WelcomePage replace to="/welcome" />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Routes>
      <Footer />
    </Fragment>
  );
}

export default App;
