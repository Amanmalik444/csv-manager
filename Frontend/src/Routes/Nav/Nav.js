import React from "react";
import "./Nav.css";
import { useHistory, useLocation } from "react-router-dom";

const Nav = () => {
  const location = useLocation();
  const history = useHistory();

  const Logout = () => {
    history.push(`/login`);
    localStorage.setItem("jwt", "");
    localStorage.setItem("user", "");
  };

  const Profile = () => {
    history.push(`/CreateTable`);
  };

  return (
    <div className="nav">
      <div className="importantButtonsNav">
        <button
          className={
            location.pathname === "/home" ? "onRouteNavButton" : "navButton"
          }
          onClick={() => history.push(`/home`)}
        >
          Home
        </button>
        <button
          className={
            location.pathname === "/CreateTable"
              ? "onRouteNavButton"
              : "navButton"
          }
          onClick={Profile}
        >
          Create a table
        </button>
      </div>
      <button
        className="navButton"
        onClick={Logout}
        style={{ marginRight: "5px" }}
      >
        Logout
      </button>
    </div>
  );
};

export default Nav;
