import React, { useState } from "react";
import { Button, FormGroup, Card, InputGroup, Form, FormControl, Toast } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const RegisterComponent = (props) => {
  const [userEmail, setUserEmail] = useState(null);
  const [userPassword, setUserPassword] = useState(null);
  const [userPasswordConfirmation, setPasswordConfirmation] = useState(null);
  const [show, setShow] = useState(false);

  const handleSubmit = (event) => {
    const url = "http://localhost:8080/api/v1/auth/register";
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (userPassword !== null && userPassword === userPasswordConfirmation) {
      axios
        .post(url, null, {
          params: {
            email: userEmail,
            password: userPassword,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            console.log("aloha");
          } else {
            console.log(`Error occurred trying to make a request to ${url}`);
            event.preventDefault();
            event.stopPropagation();
            setShow(true);
          }
        })
        .catch((error) => {
          console.error(`An error occurred trying to fetch ${url}`);
          console.error(error);
        });
    } else {
      console.error("The passwords are not the same and/or empty.");
      event.preventDefault();
      event.stopPropagation();
      setShow(true);
    }
  };

  const onEmailChange = (event) => {
    setUserEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setUserPassword(event.target.value);
  };

  const onPasswordConfirmChange = (event) => {
    setPasswordConfirmation(event.target.value);
  };

  return (
    <div className="container">
      <Card style={{ width: "40rem" }}>
        <Card.Body>
          <h4 className="card-title text-center mb-4 mt-1">Register on the site</h4>
          <Form onSubmit={handleSubmit}>
            <FormGroup controlId="registerEmail">
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
            <FormGroup controlId="registerPassword">
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
                  required
                ></FormControl>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please provide a password.
                </Form.Control.Feedback>
              </InputGroup>
            </FormGroup>
            <FormGroup controlId="registerConfirmPassword">
              <InputGroup className="mt-3">
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faLock} />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  name=""
                  placeholder="Confirm your Password"
                  type="password"
                  onChange={onPasswordConfirmChange}
                  required
                ></FormControl>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please provide a password.
                </Form.Control.Feedback>
              </InputGroup>
            </FormGroup>
            <Button variant="primary" type="submit" block>
              Register
            </Button>
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

export default RegisterComponent;
