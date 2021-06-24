import React from "react";
import "./Table.css";

const Table = ({ data }) => {
  if (data.length === 0) return null;

  const rowData = data.filter((row) => data.indexOf(row) > 0);

  return (
    <table>
      <thead>
        <tr>
          {data[0].map((heading) => (
            <th>{heading}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rowData.map((row) => (
          <tr>
            {row.map((element) => (
              <td>{element}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
