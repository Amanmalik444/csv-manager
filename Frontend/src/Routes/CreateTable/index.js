import axios from "axios";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { csvToTable } from "../utils/csvToTable";
import Table from "../Table/Table";
import "./CreateTable.css";

const CreateTable = () => {
  const [isCSVInState, setIsCSVInState] = useState(false);
  const [titleName, setTitleName] = useState("");
  const [CSV, setCSV] = useState("");
  const [csvString, setCsvString] = useState("");
  const [isUploaded, setIsUploaded] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  const UploadCSVInState = (e) => {
    e.preventDefault();
    setIsCSVInState(true);
    var reader = new FileReader();
    reader.onload = () => {
      setCsvString(reader.result);
    };
    reader.readAsBinaryString(CSV);
  };

  const UploadOnDatabase = (e) => {
    e.preventDefault();
    console.log(CSV);
    setButtonDisabled(true);
    axios
      .post(
        `${process.env.REACT_APP_SERVER_LINK}/file/`,
        {
          userId: loggedInUser._id,
          CSV: csvString,
          title: titleName,
        },
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("jwt")),
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setButtonDisabled(false);
        setIsUploaded(true);
        setIsCSVInState(false);
      })
      .catch((err) => {
        setButtonDisabled(false);
        console.log(err);
      });
  };

  if (!localStorage.getItem("jwt")) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="container">
      {isCSVInState === false ? (
        <form onSubmit={UploadCSVInState} style={{ marginTop: "25vh" }}>
          {isUploaded === true ? (
            <h2>Successfully uploaded</h2>
          ) : (
            <h3>Convert your CSV file into table and upload it</h3>
          )}
          <div className="container" style={{ height: "40vh" }}>
            <label for="file-upload" class="custom-file-upload">
              <p>Choose a file</p>
            </label>
            <input
              type="file"
              id="file-upload"
              className="originalFileInput"
              accept=".csv"
              name="csv"
              onChange={(e) => {
                setCSV(e.target.files[0]);
                setIsUploaded(false);
              }}
              style={{
                marginBottom: "5vh",
                marginTop: "1vh",
                marginLeft: "42%",
                border: "0",
              }}
              required
            />
            <input
              placeholder="Enter title for your table"
              className="input"
              onChange={(e) => setTitleName(e.target.value)}
              required
            />
            <button className="changeButton" type="submit">
              Submit
            </button>
          </div>
        </form>
      ) : (
        <div className="container" style={{ marginTop: "2vh" }}>
          <Table data={csvToTable(csvString)} />
          <form onSubmit={UploadOnDatabase}>
            <div className="container" style={{ height: "40px", padding: "0" }}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <button
                  className={
                    buttonDisabled ? "uploadButton disabled" : "uploadButton"
                  }
                  type="submit"
                  disabled={buttonDisabled}
                >
                  {buttonDisabled ? "Uploading" : "Upload on database"}
                </button>
                {/* <button className="changeButton"> Change File </button> */}
                <button
                  className="abortButton"
                  onClick={() => {
                    setIsCSVInState(false);
                    setIsUploaded(false);
                  }}
                >
                  Abort
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CreateTable;
