import React from "react";
import { useHistory } from "react-router-dom";
import Table from "../Table/Table";
import { csvToTable } from "../utils/csvToTable";
import "./cards.css";

function Cards({ title, csv, id, index }) {
  const history = useHistory();
  return (
    <>
      <div
        className="cards"
        onClick={() => {
          history.push(`./savedTable${index}`);
        }}
      >
        <div className="cardTitle">
          <h2> {title}</h2>
        </div>
        <div className="cardTable">
          <Table data={csvToTable(csv)} />
        </div>
      </div>
    </>
  );
}

export default Cards;
