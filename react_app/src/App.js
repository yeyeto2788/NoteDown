import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Cookies from "js-cookie";

import "bootstrap/dist/css/bootstrap.min.css";

import { useApplicationValue } from "./AppStateProvider";
import { reducerActions } from "./AppReducer";

import LoginComponent from "./components/LoginComponent";
import RegisterComponent from "./components/RegisterComponent";
import MainViewComponent from "./components/MainViewComponent";

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
      component = (
        <Row className="mx-0 mt-5">
          <Col>
            <RegisterComponent></RegisterComponent>
          </Col>
          <Col>
            <LoginComponent></LoginComponent>
          </Col>
        </Row>
      );
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
