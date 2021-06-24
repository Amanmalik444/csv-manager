import React, { useState, useEffect } from "react";
import axios from "axios";
import Cards from "./cards";
import { Redirect } from "react-router-dom";
import "../CreateTable/CreateTable.css";

const HomePage = () => {
  const [files, setFiles] = useState([]);
  const [filesLoaded, setFilesLoaded] = useState(false);

  // fetching all files
  useEffect(() => {
    axios
      .post(
        `${process.env.REACT_APP_SERVER_LINK}/file/fetch`,
        { id: loggedInUser._id },
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("jwt")),
          },
        }
      )
      .then((res) => {
        setFiles(res.data);
        setFilesLoaded(true);
      })
      .catch((err) => console.log(err));
  }, []);

  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  if (!localStorage.getItem("jwt")) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="cardPage">
      {filesLoaded ? (
        files.length > 0 ? (
          files.map((file) => (
            <Cards
              title={file.title}
              csv={file.CSV}
              id={file._id}
              index={files.indexOf(file)}
            />
          ))
        ) : (
          <div
            style={{ height: "80vh", display: "flex", alignItems: "center" }}
          >
            <h3>No files uploaded yet</h3>
          </div>
        )
      ) : (
        <div style={{ height: "80vh", display: "flex", alignItems: "center" }}>
          <h3>Loading</h3>
        </div>
      )}
    </div>
  );
};

export default HomePage;
