import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";

import { useApplicationValue } from "../AppStateProvider";
import { reducerActions } from "../AppReducer";
import logo from "../notedown_logo.svg";

import LoginComponent from "./LoginComponent";
import RegisterComponent from "./RegisterComponent";

const RegisterLoginComponent = () => {
  return (
    <Col>
      <Row className="justify-content-md-center mt-5">
        <Col>
          <Row className="justify-content-md-center">
            <img src={logo} alt="" width="10%" />
          </Row>
          <Row className="justify-content-md-center">
            <h2 className="text-muted">Markdown note-taking app using React.js and Python.</h2>
          </Row>
        </Col>
      </Row>

      <Row className="mx-0 mt-5">
        <Col>
          <RegisterComponent></RegisterComponent>
        </Col>
        <Col>
          <LoginComponent></LoginComponent>
        </Col>
      </Row>
    </Col>
  );
};

export default RegisterLoginComponent;
