import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./loginPage.css";
import axios from "axios";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const history = useHistory();

  const Submit = (e) => {
    e.preventDefault();
    setButtonDisabled(true);
    axios
      .post(`${process.env.REACT_APP_SERVER_LINK}/login/`, {
        userName,
        password,
      })
      .then((res) => {
        console.log(res.data);
        setButtonDisabled(false);
        localStorage.setItem("jwt", JSON.stringify(res.data.data.token));
        localStorage.setItem("user", JSON.stringify(res.data.user));
        history.push("/CreateTable");
      })
      .catch((err) => {
        setButtonDisabled(false);
        console.log(err);
      });
    console.log("Logged In");
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgb(230, 230, 230)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          margin: "10vh",
          height: "45vh",
          width: "40vh",
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
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <input
              placeholder="Enter Username"
              className="input"
              onChange={(e) => setUserName(e.target.value)}
              required
            />
            <input
              className="input"
              type="password"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              className={buttonDisabled ? "button disabled" : "button"}
              type="submit"
              disabled={buttonDisabled}
            >
              {buttonDisabled ? "Logging In" : "Submit"}
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
              <h5>New user </h5>
              <h5
                style={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  history.push("/register");
                }}
              >
                ? Register
              </h5>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
