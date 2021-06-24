import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Table from "../Table/Table";
import { csvToTable } from "../utils/csvToTable";
import "./cards.css";

const SavedTable = () => {
  const [files, setFiles] = useState([]);
  const [tableLoaded, setTableLoaded] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [deleteButtonClicked, setDeleteButtonClicked] = useState(false);

  const history = useHistory();

  useEffect(() => {
    setButtonDisabled(true);
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
        setButtonDisabled(false);
        setFiles(res.data);
        setTableLoaded(true);
      })
      .catch((err) => {
        setButtonDisabled(false);
        console.log(err);
      });
  }, []);

  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  const deleteTable = () => {
    setButtonDisabled(true);
    axios
      .post(
        `${process.env.REACT_APP_SERVER_LINK}/file/delete`,
        { tableId: files[id]._id },
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("jwt")),
          },
        }
      )
      .then((res) => {
        setButtonDisabled(false);
        console.log(res);
        history.push("./home");
      })
      .catch((err) => {
        setButtonDisabled(false);
        console.log(err);
      });
  };

  let { id } = useParams();

  return (
    <>
      <div className="container">
        {tableLoaded === true ? (
          <div className="container">
            <Table data={csvToTable(files[id].CSV)} />
            <div
              className="importantButtonsNav"
              style={{
                marginTop: "3vh",
                padding: "0",
              }}
            >
              <button
                className="changeButton"
                style={{ margin: "4px" }}
                onClick={() => {
                  history.push("./home");
                }}
              >
                Go back to home
              </button>
              {deleteButtonClicked === false ? (
                <button
                  style={{ margin: "4px" }}
                  onClick={() => {
                    setDeleteButtonClicked(true);
                  }}
                  className="changeButton"
                >
                  Delete this table
                </button>
              ) : (
                <button
                  className={
                    buttonDisabled ? "abortButton disabled" : "abortButton"
                  }
                  style={{ margin: "4px" }}
                  onClick={() => {
                    deleteTable();
                  }}
                  disabled={buttonDisabled}
                >
                  {buttonDisabled ? "Deleting" : "Confirm"}
                </button>
              )}
              <button
                className="changeButton"
                style={{ margin: "4px" }}
                onClick={() => {
                  history.push("./CreateTable");
                }}
              >
                Create new table
              </button>
            </div>
          </div>
        ) : (
          <h2 style={{ marginTop: "30vh", marginBottom: "10vh" }}>
            Loading table
          </h2>
        )}
      </div>
    </>
  );
};

export default SavedTable;
