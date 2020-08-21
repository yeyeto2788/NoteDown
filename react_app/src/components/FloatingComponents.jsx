import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import "../index.css";

const FloatingContainer = (props) => {
  return (
    <nav className={`fab-container ${props.className}`} style={props.styles}>
      {props.children}
    </nav>
  );
};

const FloatingButton = (props) => {
  return (
    <button
      onClick={props.onClick}
      className={`fab-item ${props.className} ${props.rotate ? "fab-rotate" : ""}`}
      tooltip={props.tooltip}
      style={props.styles || defaultItemStyles}
    >
      <FontAwesomeIcon icon={faPlus} />
      {props.children}
    </button>
  );
};

const defaultItemStyles = {
  backgroundColor: "#007bff",
  color: "#b5b5b5",
  textDecoration: "none",
  border: "none",
};

export { FloatingButton, FloatingContainer };
