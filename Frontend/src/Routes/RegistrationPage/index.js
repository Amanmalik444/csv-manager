import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "../LoginPage/loginPage.css";

const Register = () => {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const history = useHistory();

  const Submit = (e) => {
    e.preventDefault();
    setButtonDisabled(true);
    axios
      .post(`${process.env.REACT_APP_SERVER_LINK}/register/`, {
        name,
        userName,
        password,
      })
      .then((res) => {
        setButtonDisabled(false);
        console.log(res, "registered");
        history.push("/login");
      })
      .catch((err) => {
        setButtonDisabled(false);
        console.log(err);
      });

    e.target.reset();
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgb(230, 230, 230)",
      }}
    >
      <div
        style={{
          display: "flex",
          height: "50vh",
          width: "40vh",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          border: "1px solid rgba(0,0,0,0.2)",
          backgroundColor: "rgb(255, 255, 255)",
          boxShadow: "8px 8px 15px 5px rgba(0, 0, 0, 0.2)",
        }}
      >
        <form onSubmit={Submit}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <input
              className="input"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              className="input"
              placeholder="Enter Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
            <input
              placeholder="Enter Password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              className={buttonDisabled ? "button disabled" : "button"}
              type="submit"
              disabled={buttonDisabled}
            >
              {buttonDisabled ? "Registering" : "Register"}
            </button>

            <div
              style={{
                textAlign: "center",
                marginTop: "1vh",
                display: "flex",
                flexDirection: "row",
                color: "black",
              }}
            >
              <h5>Already a user</h5>
              <h5
                style={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  history.push("/login");
                }}
              >
                ? Login
              </h5>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
