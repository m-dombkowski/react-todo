import GreetingsMessage from "../../components/GreetingsMessage/GreetingsMessage";
import UserContext from "../../context/user-context";
import { Fragment, useContext } from "react";
import Calendar from "../../components/Calendar/Calendar";
import Footer from "../../ui/Footer/Footer";
const WelcomePage = () => {
  const userContext = useContext(UserContext);
  const isLoggedIn = userContext.isLoggedIn;

  return (
    <Fragment>
      {!isLoggedIn && <GreetingsMessage />}
      {isLoggedIn && <Calendar />}
      {!userContext.isLoggedIn && <Footer />}
    </Fragment>
  );
};

export default WelcomePage;
