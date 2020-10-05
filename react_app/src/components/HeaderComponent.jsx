import React from "react";
import { NavDropdown, Navbar, Form, FormControl, Nav, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import axios from "axios";

import { useApplicationValue } from "../AppStateProvider";
import { reducerActions } from "../AppReducer";

const HeaderComponent = (props) => {
  const [{ currentUser, userToken }, dispatchAction] = useApplicationValue();

  const handleLogout = () => {
    const url = `${process.env.REACT_APP_NOTEDOWN_API_URL}/api/v1/auth/logout`;

    axios
      .post(url, null, {
        headers: { "X-API-KEY": userToken },
      })
      .then((response) => {
        const data = response.data;
        console.log(`Successfully logout: ${data}`);
      })
      .catch((error) => {
        console.error(`An error occurred trying to fetch ${url}`);
        console.error(error);
      });

    Cookies.remove("noteDownUser");
    Cookies.remove("noteDownUserToken");

    dispatchAction({
      type: reducerActions.tokenChange,
      item: null,
    });
    dispatchAction({
      type: reducerActions.userChange,
      item: null,
    });
  };

  return (
    <Navbar className="align-self-center" bg="primary" variant="dark" fixed="top">
      <Navbar.Brand href="#home">NoteDown</Navbar.Brand>
      <Nav className="mr-auto">
        {/* <Nav.Link href="#link1">link1</Nav.Link>
        <Nav.Link href="#link2">link2</Nav.Link> */}
      </Nav>
      <Form>
        <InputGroup className="mt-3">
          <FormControl
            id="searchBox"
            placeholder="Search on notes"
            type="text"
            onChange={props.OnSearchChange}
          ></FormControl>
          <InputGroup.Append>
            <InputGroup.Text>
              <FontAwesomeIcon icon={faSearch} onClick={props.onSearch} />
            </InputGroup.Text>
          </InputGroup.Append>
        </InputGroup>
      </Form>
      <Nav className="mr-auto">
        <NavDropdown title={currentUser} id="basic-nav-dropdown">
          <NavDropdown.Item href="#" onClick={handleLogout}>
            Logout
          </NavDropdown.Item>
          <NavDropdown.Item href="#">Action 1</NavDropdown.Item>
          <NavDropdown.Item href="#">Action 2</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar>
  );
};

export default HeaderComponent;
