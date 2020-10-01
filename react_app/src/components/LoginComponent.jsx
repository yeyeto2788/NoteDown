import React from "react";
import { Button, FormGroup, Card, InputGroup, Form, FormControl, Toast } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Cookies from "js-cookie";

import { useApplicationValue } from "../AppStateProvider";
import { reducerActions } from "../AppReducer";
import { useState } from "react";

const LoginComponent = (props) => {
  const [{}, dispatchAction] = useApplicationValue();

  const [userEmail, setUserEmail] = useState(null);
  const [userPassword, setUserPassword] = useState(null);
  const [loginRetries, setRetries] = useState(0);
  const [show, setShow] = useState(false);

  const handleSubmit = (event) => {
    const url = `${process.env.REACT_APP_NOTEDOWN_API_URL}/api/v1/auth/login`;
    setRetries(loginRetries + 1);
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (loginRetries > 2) {
      console.error("User is blocked.");
      setShow(true);
    } else {
      /* Send request to the API in order to 
      /  get the token and set it below
      /  so all subsequent requests send it.
      */
      axios
        .post(url, null, {
          auth: {
            username: userEmail,
            password: userPassword,
          },
        })
        .then((response) => {
          console.log(`Successfully added user: ${userEmail}`);
          console.log(response.status);
          console.log(response);
          if (response.status === 200) {
            const token = response.data.token;
            dispatchAction({
              type: reducerActions.tokenChange,
              item: token,
            });
            dispatchAction({
              type: reducerActions.userChange,
              item: userEmail,
            });
            // Set cookies for further ussage.
            Cookies.set("noteDownUser", userEmail, { expires: 1 });
            Cookies.set("noteDownUserToken", token, { expires: 1 });
          } else {
            setShow(true);
          }
        })
        .catch((error) => {
          console.error(`An error occurred trying to fetch ${url}`);
          console.error(error);
          setShow(true);
        });
    }
  };

  const onEmailChange = (event) => {
    setUserEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setUserPassword(event.target.value);
  };

  return (
    <div className="container">
      <Card style={{ width: "40rem" }}>
        <Card.Body>
          <h4 className="card-title text-center mb-4 mt-1">Sign in</h4>
          <Form>
            <FormGroup controlId="loginEmail">
              <InputGroup className="mt-3">
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faUser} />
                  </InputGroup.Text>
                </InputGroup.Prepend>

                <FormControl
                  name=""
                  placeholder="Email"
                  type="email"
                  onChange={onEmailChange}
                  required
                ></FormControl>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please provide a good email.
                </Form.Control.Feedback>
              </InputGroup>
            </FormGroup>
            <FormGroup controlId="loginPassword">
              <InputGroup className="mt-3">
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faLock} />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  name=""
                  placeholder="Password"
                  type="password"
                  onChange={onPasswordChange}
                ></FormControl>
              </InputGroup>
            </FormGroup>
            <Button variant="primary" onClick={handleSubmit} block>
              Login
            </Button>
            <p className="text-center">
              {/* <a href="#" class="btn">
              Forgot password?
            </a> */}
            </p>
          </Form>
        </Card.Body>
      </Card>
      <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
          <strong className="mr-auto">Error occurred</strong>
        </Toast.Header>
        <Toast.Body>
          <p>There was an error trying to register.</p>
          <p>
            <small>Try back again!</small>
          </p>
        </Toast.Body>
      </Toast>
    </div>
  );
};

export default LoginComponent;
