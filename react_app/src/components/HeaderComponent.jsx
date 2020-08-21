import React from "react";
import { Button, Nav, Navbar, Form, FormControl } from "react-bootstrap";

const HeaderComponent = (props) => {
  return (
    <Navbar bg="primary" variant="dark">
      <Navbar.Brand href="#home">NoteDown</Navbar.Brand>
      <Nav className="mr-auto">
        {/* <Nav.Link href="#link1">link1</Nav.Link>
        <Nav.Link href="#link2">link2</Nav.Link> */}
      </Nav>
      <Form inline>
        <FormControl
          id="searchBox"
          type="text"
          placeholder={props.placeholder}
          className="mr-sm-2"
          onChange={props.OnSearchChange}
          onSubmit={props.onSubmit}
        />
        <Button variant="outline-light" onClick={props.onSearch}>
          Search
        </Button>
      </Form>
    </Navbar>
  );
};

export default HeaderComponent;
