import React, { useEffect } from "react";
import Cookies from "js-cookie";

import "bootstrap/dist/css/bootstrap.min.css";

import { useApplicationValue } from "./AppStateProvider";
import { reducerActions } from "./AppReducer";

import MainViewComponent from "./components/MainViewComponent";
import RegisterLoginComponent from "./components/RegisterLoginComponent";

const App = () => {
  const [{ currentUser, userToken }, dispatchAction] = useApplicationValue();

  const readCookies = () => {
    const user = Cookies.get("noteDownUser");
    const token = Cookies.get("noteDownUserToken");

    if (user && token) {
      dispatchAction({
        type: reducerActions.tokenChange,
        item: token,
      });
      dispatchAction({
        type: reducerActions.userChange,
        item: user,
      });
    }
  };

  const showPage = () => {
    let component;

    if (currentUser === null || userToken === null) {
      component = <RegisterLoginComponent></RegisterLoginComponent>;
    } else {
      component = <MainViewComponent></MainViewComponent>;
    }

    return component;
  };

  useEffect(() => {
    readCookies();
  }, []);

  return <div>{showPage()}</div>;
};

export default App;
